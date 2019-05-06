/* 
    初步实现可以访问接口，接口返回数据
*/
'use strict'
const path = require('path');
const fs = require('fs');
const http = require('http');
const url = require('url');
var tool = require('./utils/tool');
const {
    URLSearchParams
} = require('url');
const getApi = require("./api/index");

const config = require('./config.js'); //配置文件
const html = fs.readFileSync("./static/template.html", 'utf-8'); //配置文件
var root = path.join(__dirname, config.root); //根目录
console.log('根目录: ' + root);
const server = http.createServer(function (request, response) {
    var pathName = decodeURIComponent(url.parse(request.url).pathname); //请求的路径
    var query = decodeURIComponent(url.parse(request.url).query); //请求的路径
    var refererPath = tool.getFullPath(request);
    if (pathName == ('/' + refererPath)) { //为了处理音频发出的两次请求
        refererPath = '';
    }
    var donePath = path.join(root, refererPath, pathName);
    var hasState = tool.isHas(donePath); //当前这个请求的状态
    if (hasState == 0) { //如果没有找到请求路径，就直接返回404
        if (getApi[pathName]) {
            getApi[pathName](query).then(res => {
                apiResponse(response, res)
            });
        } else {
            console.log("无法获取到的链接", donePath);
            notFoundResponse(response);
        }
    } else if (hasState == 1) { //如果文件存在，就直接返回
        copyFileResponse(donePath, response);
    } else { //否则遍历目录，返回所有的目录
        tool.getdirList(html,path.join(root, pathName), response);
    }
});


function apiResponse(response, data) {
    response.setHeader('Content-Type', 'text/plain; charset=utf-8')
    response.writeHead(200);
    response.end(JSON.stringify(data));
}

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