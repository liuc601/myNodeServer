const mysql = require("mysql");
var db = {};
var dbconfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodedb',
    port: '3306'
};
db.query = (sqlyuju) => {
    var connection = mysql.createConnection(dbconfig);
    var connect = null;
    var p = null;
    connect = new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                console.log(err);
                reject(err)
                return;
            }
            resolve(true)
        });
    })
    return connect.then(res => {
        var sql = sqlyuju;
        if (!sql) {
            console.log("请输出查询语句");
            return;
        }
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    reject(err)
                    return;
                }
                resolve(rows);
            });
            connection.end(err => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('数据库链接关闭');
                }
            });
        })

    })
}
module.exports = db;