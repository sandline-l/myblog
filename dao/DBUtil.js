//创建一个函数, 用来链接数据库的
var mysql = require('mysql');
function createConnection() {
    var connection = mysql.createConnection({
        host:'127.0.0.1',
        port:'3306',
        user:'root',
        password:'sandline123',
        database:'my_blog'
    });
    return connection;
}


module.exports.createConnection = createConnection;
