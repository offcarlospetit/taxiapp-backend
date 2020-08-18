var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req: any, res: any) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket: any) => {
    socket.on("chat Message", (message: string) => {
        console.log(message)
    })
    console.log('a user connected');
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});