//创建一个函数, 用来链接数据库的
var mysql = require('mysql');
function createConnection() {
    // 创建连接
    var connection = mysql.createConnection({
        host:'127.0.0.1',
        port:'3306',
        user:'root',
        password:'123456',
        database:'test'
    });
    return connection;
}

// 导出了一个 方法 .  module.exports 实际上是一个对象, 是对外的接口.
module.exports.createConnection = createConnection;
