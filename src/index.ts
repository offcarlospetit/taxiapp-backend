var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

let driverSocket: SocketIO.Socket;
let passengerSocket: SocketIO.Socket;


app.get('/', (req: any, res: any) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket: SocketIO.Socket) => {
    socket.on("driverRequest", (route: any) => {
        console.log("driverRequest from passenger")
        passengerSocket = socket
        if (driverSocket) driverSocket.emit("driverRequest", route)
    })

    socket.on("driverLocation", (location: { latitude: any, longitude: any }) => {
        console.log("driverLocation from driver")
        passengerSocket.emit('driverLocation', location)
    })

    socket.on("lookingPassanger", () => {
        console.log("lookingPassanger from driver")
        driverSocket = socket
    })

});

http.listen(3009, () => {
    console.log('listening on *:3009');
});