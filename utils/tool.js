const path = require('path');
const fs = require('fs');
const url = require('url');
function getFullPath(request) { //返回路径，不包含资源
    var host = request.headers.host;
    var referer = request.headers.referer;
    if (referer != undefined) {
        referer = referer.slice(referer.indexOf(host) + host.length + 1);
    } else {
        referer = '';
    }
    return decodeURIComponent(referer);
}

function getdirList(html,filepath, response) { //获取当前目录下的所有目录
    fs.readdir(filepath, "utf-8", (err, list) => {
        if (err) {
            console.log("?????", err);
        } else {
            var a = '';
            var resHtml = html.slice(0);
            if (list.indexOf('index.html') != -1) {
                response.end(fs.readFileSync(
                    path.join(filepath, "index.html"), 'utf-8'));
            } else {
                list.forEach(item => {
                    a += "<a href='" + item + "'>" + item + "</a></br>"
                });
                response.end(resHtml.replace('dirList', a));
            }
        }
    })
}

function isHas(file) { //判断文件或者文件夹是否存在是否存在
    try {
        var s = fs.statSync(file);
        if (s.isFile()) {
            return 1; //是一个文件
        } else if (s.isDirectory()) {
            return 2; //一个目录
        } else {
            return 404
        }
    } catch (e) {
        return 0; //路径没有找到
    }
}

function baseResponse(data, state, opt) {
    var res = {};
    if (!state) {
        res = {
            resphead: {
                statuscode: "00000",
                succeed: true
            },
            respbody: data
        }
    } else {
        res = {
            resphead: {
                statuscode: opt.statuscode,
                succeed: false,
                message: opt.message
            },
        }
    }
    return res;
}
module.exports = {
    isHas,
    getdirList,
    getFullPath,
    baseResponse
}