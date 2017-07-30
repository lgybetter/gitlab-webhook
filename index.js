const http = require('http')
const config = require('./config')
const createHandler = require('node-gitlab-webhook')
const pushServer = require('./push-server')
const handler = createHandler([
  { path: '/webhook', secret: config.secret },
])
const getRoomId = require('./utils').getRoomId

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
  let roomId = getRoomId(event.payload.repository.name)
  pushServer.pushMessage(roomId, {
    repository: event.payload.repository.name,
    ref: event.payload.ref
  })
})

// test code
// setInterval(() => {
//   let roomId = getRoomId('auto-upload')
//   pushServer.pushMessage(roomId, {
//     repository: 'auto-upload',
//     ref: 'dev'
//   })
// }, 5000)