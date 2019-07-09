//cSpell:ignore mosca

const {Server, persistence} = require('mosca');
const redis = require('redis');

const backend = {
  type: 'redis',
  redis,
  db: 12,
  port: 6379,
  return_buffers: true, // to handle binary payloads
  host: 'redis'
};

const moscaSettings = {
  port: 1883,
  backend,
  persistence: {
    factory: persistence.Redis,
    host: 'redis',
    port: 6379
  }
};

const server = new Server(moscaSettings);
server.on('ready', setup);

server.on('clientConnected', function (client) {
  console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function (packet, client) {
  console.log('published', packet.topic, ' size:' ,packet.payload && packet.payload.length);
});

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running')
}
