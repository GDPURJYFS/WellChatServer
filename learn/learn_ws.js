const ws = require('ws');
const WebSocketServer = ws.Server;

let wss = new WebSocketServer({port: 8080});
wss.on('connection', function (ws) {
    console.log('client connected');
    ws.on('message', function (message) {
        console.log(message);
    });
});

console.log('websocket port 8080');

//! [nodejs socket.io初探](http://www.cnblogs.com/whoamme/p/3467354.html)
//! [websockets/ws](https://github.com/websockets/ws)
