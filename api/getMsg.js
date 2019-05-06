const url=require('url');
const {URLSearchParams} = require('url');
function getMsg(query){
    var params=new URLSearchParams(query);
    var o={
        a:params.get("a"),
        b:params.get("b"),
    }
    return new Promise(resolve=>{
        resolve(o)
    })
}


module.exports=getMsg;