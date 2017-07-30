const pushServer = require('../push-server')
const getRoomId = require('../utils').getRoomId

describe('push message', () => {
  it('push project new commit message', done => {
    let payload = {
      repository: {
        name: 'auto-upload'
      },
      ref: 'dev'
    }
    let roomId = getRoomId(payload.repository.name)
    pushServer.pushMessage(roomId, {
      repository: payload.repository.name,
      ref: payload.ref
    }).then(done, done);
  })
})