'use strict';

const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;

let wss = new WebSocketServer(
    {
        port: 8080
    }
);

function login(ws, sid) {
    ws['__custom_id__'] = sid;
    ws['__listen__'] = {};
}

function subMsg(ws, sid) {
    if (sid == 'all') {
        ws['__listen__'] = sid;
    } else {
        for (let i in sid) {
            ws['__listen__'][sid[i]] = sid[i];
        }
    }
}

function whenListenIdnAndBroadcast(whoSend, messgeString) {
    wss.clients.forEach(function (client) {
        if (client.readyState === WebSocket.OPEN) {
            // console.info(`__listen__:${client['__listen__']}`);
            // console.info(`whoSend:${whoSend}, client.__custom_id__:${client.__custom_id__}, ${whoSend == client.__custom_id__}`);
            if (!client.hasOwnProperty('__listen__')) {
                return;
            }

            if (client.__listen__ == 'all' && client.__custom_id__ !== whoSend) {
                client.send(messgeString);
                return;
            }

            if (client.__listen__.hasOwnProperty(whoSend)) {
                client.send(messgeString);
            }
        }
    });
}

wss.on('connection', function (ws) {
    // console.log('client connected:', ws.upgradeReq.headers['sec-websocket-key']);

    ws.on('message', function (message) {
        let msgObj = JSON.parse(message);

        switch (msgObj.op) {
            case 'chat':
                whenListenIdnAndBroadcast(msgObj.data.sid, message);
                break;
            case 'login':
                login(ws, msgObj.data.id);
                break;
            case 'sub_msg':
                subMsg(ws, msgObj.data.sid);
                break;
            case 'ping':
                ws.send(JSON.stringify({'op': 'pong', 'ts': Date.now()}));
                break;
            default:
                break;
        }
    });
});

console.log('websocket port 8080');
