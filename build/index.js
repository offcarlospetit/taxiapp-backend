"use strict";
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
let driverSocket;
let passengerSocket;
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
io.on('connection', (socket) => {
    socket.on("driverRequest", (route) => {
        console.log("driverRequest from passenger");
        passengerSocket = socket;
        if (driverSocket)
            driverSocket.emit("driverRequest", route);
    });
    socket.on("driverLocation", (location) => {
        console.log("driverLocation from driver");
        passengerSocket.emit('driverLocation', location);
    });
    socket.on("lookingPassanger", () => {
        console.log("lookingPassanger from driver");
        driverSocket = socket;
    });
});
http.listen(3009, () => {
    console.log('listening on *:3009');
});
