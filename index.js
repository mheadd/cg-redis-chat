const cfenv = require('cfenv');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const redisAdapter = require('socket.io-redis');

// Get Redis service credentials.
const appEnv = cfenv.getAppEnv();
const redisService = appEnv.getService('redis-chat');

io.adapter(redisAdapter({ host: redisService.credentials.hostname, port: redisService.credentials.port, password: redisService.credentials.password }));

const roomName = 'VIRLRoom';
const port = process.env.PORT || 3000;
app.use(express.static('client'));

io.on('connection', (socket) => {
    io.of('/').adapter.remoteJoin(socket.id, roomName, (err) => {
        if(!err) {
            console.log(`${socket.id} joined the room: ${roomName}`);
        }
        else {
            console.log(`${err}`);
        }

    });
    socket.on('chat.message', (msg) => {
        io.to(roomName).emit('chat.message', msg);
    });
});

http.listen(port);