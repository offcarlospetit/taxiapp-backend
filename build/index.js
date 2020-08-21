"use strict";
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
io.on('connection', (socket) => {
    socket.on("chat Message", (message) => {
        console.log(message);
    });
    console.log('a user connected');
});
http.listen(3009, () => {
    console.log('listening on *:3009');
});
