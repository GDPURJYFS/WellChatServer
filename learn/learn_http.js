const http = require("http");
var server = http.createServer(function (req, res) {
    res.writeHeader(200, {
        'Content-Type': 'text/plain;charset=utf-8'  // 添加charset=utf-8
    });
    res.end("Hello,大熊！");
});
server.listen(8080);
console.log('http port 8080');