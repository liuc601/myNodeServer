/* 
    文件服务器，解析文件，根据目录返回目录下的index.html文件,目前已经可以使用
    唯一的一个小问题是如果资源名称是被编码过的，会无法处理
    列表的原始比较难看
*/
'use strict'
const path = require('path');
const fs = require('fs');
const http = require('http');
const url = require('url');

const config=require('./config.js');//配置文件
const html=fs.readFileSync("template.html",'utf-8');//配置文件
var root = path.join(__dirname, config.root);//根目录
console.log('根目录: ' + root);
const server = http.createServer(function (request, response) {
    var pathName =decodeURIComponent( url.parse(request.url).pathname);//请求的路径
    var refererPath=getFullPath(request);
    if(pathName==('/'+refererPath)){//为了处理音频发出的两次请求
        refererPath='';
    }
    var donePath=path.join(root,refererPath, pathName);
    var hasState=isHas(donePath);//当前这个请求的状态
    if(hasState==0){//如果没有找到请求路径，就直接返回404
        notFoundResponse(response);
    }else if(hasState==1){//如果文件存在，就直接返回
        copyFileResponse(donePath, response);
    }else{//否则遍历目录，返回所有的目录
        getdirList(path.join(root, pathName),response);
    }
});

function isHas(file){//判断文件或者文件夹是否存在是否存在
    try{
        var s= fs.statSync(file);
        if(s.isFile()){
            return 1;//是一个文件
        }else if(s.isDirectory()){
            return 2;//一个目录
        }else{
            return 404
        }
    }catch(e){
        return 0;//路径没有找到
    }
}

function getFullPath(request){//返回路径，不包含资源
    var host=request.headers.host;
    var referer=request.headers.referer;
    if(referer!=undefined){
        referer=referer.slice(referer.indexOf(host)+host.length+1);
    }else{
        referer='';
    }
    return decodeURIComponent(referer);
}

function getdirList(filepath,response){//获取当前目录下的所有目录
    fs.readdir(filepath,"utf-8", (err, list)=>{
        if(err){
            console.log("?????",err);
        }else{
            var a='';
            var resHtml=html.slice(0);
            if(list.indexOf('index.html')!=-1){
                response.end(fs.readFileSync(
                    path.join(filepath, "index.html")
                    ,'utf-8'));
                }else{
                    list.forEach(item=>{
                        a+="<a href='"+item+"'>"+item+"</a></br>" 
                    });
                    response.end(resHtml.replace('dirList',a));
                }
            }
        })
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