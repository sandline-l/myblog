//创建一个函数, 用来链接数据库的
var mysql = require('mysql');
    var connection = mysql.createConnection({
        // host:'127.0.0.1',
        host:'localhost',
        port:'3306',
        user:'root',
        password:'sandline123',
        database:'my_blog',
        // database:'test',
        // database:'bboc'
    });
connection.connect(function(err){
    if(err){
        console.log(`mysql连接失败: ${err}!`);
    }else{
        console.log("mysql连接成功!");
    }
});
connection.end();
