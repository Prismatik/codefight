http = require 'http'

server = http.createServer()

server.on 'request', (req, res) ->
  messages = {}
  services = ['twitter', 'facebook', 'instagram']
  services.forEach (service) ->
    http.get
      hostname: 'codefight.davidbanham.com'
      path: "/#{service}"
    , (data) ->
      data.on 'data', (chunk) ->
        messages[service] = JSON.parse chunk.toString()
        res.end JSON.stringify messages if Object.keys(messages).length is services.length

server.listen process.env.PORT or 3000
