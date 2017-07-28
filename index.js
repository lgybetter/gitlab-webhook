const http = require('http')
const config = require('./config')
const createHandler = require('node-gitlab-webhook')
const handler = createHandler([
  { path: '/webhook', secret: config.secret },
])

http.createServer((req, res) => {
  handler(req, res, err => {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(config.port)

handler.on('error', err => {
  console.error('Error:', err.message)
})

handler.on('push', event => {
  console.log(
    'Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref
  )
  console.log(event.path)
})