const fs = require('fs');
const path = require('path');
var ApiObj = {};
try {
    var dir = fs.readdirSync(__dirname, "utf-8");
    getAllApi(dir);
} catch (e) {
    console.log(e)
}

function getAllApi(pathArr) {
    ApiObj = {};
    pathArr.forEach(item => {
        var p = path.join(__dirname, item);
        try {
            var flie = fs.readFileSync(p, "utf-8");
            ApiObj[doApiPathName(item)] = require(p);
        } catch (e) {
            console.log(e);
        }
    })
}

function doApiPathName(paths) { //处理api的路径名称
    var p = paths.replace(/\.js/ig, "");
    p = path.join("/api", p);
    p = p.replace(/\\/ig, "/");
    return p
}
module.exports = ApiObj