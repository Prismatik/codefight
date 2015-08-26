promserver = require 'promserver'
fetch = require 'node-fetch'

getData = (service) ->
  fetch "http://codefight.davidbanham.com/#{service}"
  .then (res) -> if res.ok then res.json() else getData service

promserver 3000, ->
  Promise.all [
    getData 'twitter'
    getData 'facebook'
    getData 'instagram'
  ]
  .then ([twitter, facebook, instagram]) -> body: {twitter, facebook, instagram}