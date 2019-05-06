/* 
    创建一个简单的服务器
*/
'use strict'
const http=require('http');
const server=http.createServer(function(request,response){
    ServerRequest(request);
    ServerReponse(response);
});
/* 
    请求
*/
function ServerRequest(request){
    console.log(request.method + ': ' + request.url);
}
/* 
响应
*/
function ServerReponse(response){
    // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
    response.writeHead(200, {'Content-Type': 'text/html'});
    // 将HTTP响应的HTML内容写入response:
    response.end('<h1>Hello world!</h1>');
}
server.listen(8000);
console.log('服务器开启');
