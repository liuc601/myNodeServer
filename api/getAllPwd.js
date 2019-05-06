const mysql=require('../db');
const tool=require('../utils/tool');

function getAllPwd(query){
    return mysql.query('SELECT * FROM `pwdtable`').then(res=>{
        return tool.baseResponse(res);
    }).catch((err)=>{
        return tool.baseResponse(null,true,{
            message:'服务器出了点儿小问题，请联系管理员',
            statecode:666
        });
    })
}

module.exports=getAllPwd;