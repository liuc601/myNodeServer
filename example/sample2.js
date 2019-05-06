/* 
    文件服务器，解析文件，根据目录返回目录下的index.html文件
*/
'use strict'
const path = require('path');
const fs = require('fs');
const http = require('http');
const url = require('url');
// 从命令行参数获取root目录，默认是当前目录:
// var root = path.resolve(process.argv[2] || '.');
var root = path.join(__dirname, '/src');
var htmlRoot='';
console.log('根目录: ' + root);

const server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    if (pathname == '/') { //做特殊处理，如果没有指定名称就直接拼接index。html
        pathname += 'index.html'
    }
    //判断是目录还是文件
    var filepath = path.join(root, pathname);
    // 获取文件状态:
    fs.stat(filepath, function (err, stats) {
        if (!err && stats.isFile()) {
            copyFileResponse(filepath, response);
        } else if (!err && stats.isDirectory()) {
            var _filepath = path.join(filepath, '/index.html');
            fs.stat(_filepath, function (err, stats) {
                if (!err && stats.isFile()) {
                    htmlRoot=filepath;
                    copyFileResponse(_filepath, response);
                } else {
                    notFoundResponse(response);
                }
            })
        } else {
            notFoundResponse(response);
        }
    });
});

function copyFileResponse(filepath, response) {
    //返回文件
    response.writeHead(200);
    fs.createReadStream(filepath).pipe(response);
}
function notFoundResponse(response) {
    //404
    response.writeHead(404);
    response.end('404 Not Found');
}
server.listen(8000);
console.log('服务器开启');