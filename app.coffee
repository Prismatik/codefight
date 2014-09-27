t2 = require 'through2'
request = require 'request'
http = require 'http'
CombinedStream = require 'combined-stream'

server = http.createServer()

services = ['twitter', 'facebook', 'instagram']

parser = ->
  return t2.obj (doc, enc, cb) ->
    data = JSON.parse doc.toString()
    service = 'twitter' if data[0].tweet
    service = 'facebook' if data[0].status
    service = 'instagram' if data[0].picture
    @push { service: service, messages: data }
    cb()
assembler = ->
  return t2.obj (doc, enc, cb) ->
    @push "\"#{doc.service}\": #{JSON.stringify(doc.messages)}"
    cb()
commafier = ->
  return t2.obj (doc, enc, cb) ->
    @count ?= 0
    @count++
    doc += ',' unless @count >= services.length
    @push doc
    cb()
liner = ->
  return t2.obj (doc, enc, cb) ->
    @push doc + '\n'
    cb()
ender = ->
  return t2.obj null, null, (cb) ->
    @push '}\n'
    cb()

server.on 'request', (req, res) ->
  res.write '{\n'
  combinedStream = CombinedStream.create({pauseStreams: false})
  services.forEach (service) ->
    combinedStream.append request.get("http://codefight.davidbanham.com/#{service}")
  combinedStream
    .pipe(parser())
    .pipe(assembler())
    .pipe(commafier())
    .pipe(liner())
    .pipe(ender())
    .pipe(res)

server.listen process.env.PORT or 3000
