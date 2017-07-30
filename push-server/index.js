const io = require('socket.io-client');
const config = require('../config');

class PushService {

  constructor(url) {
    this.ready = false;
    this.client = io(url);
    this.client.on('connect', () => {
      this.ready = true;
      console.log(`socket.io-client for ${url} ${this.ready}`);
    });
  }
  pushMessage(roomId, message) {
    return new Promise((resolve, reject) => {
      if (!this.ready) {
        console.error('socket.io-client is not ready', roomId, message);
        return reject({ message: `socket.io-client is not ready, ${roomId}, ${message}` });
      }
      console.log('socket.io-client is ready', roomId, message);
      this.client.emit('pushMessage', { roomId, message });
      return resolve();
    })
  }
  broadcastMessage(message) {
    return new Promise((resolve, reject) => {
      if (!this.ready) {
        console.error('socket.io-client is not ready', roomId, message);
        return reject({ message: `socket.io-client is not ready, ${roomId}, ${message}` });
      }
      console.log('socket.io-client is ready', roomId, message);
      this.client.emit('broadcastMessage', { message });
      return resolve();
    })
  }
}

module.exports = new PushService(config.pushServiceUrl);

