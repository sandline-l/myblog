// 将传过来的数据写入数据库
var dbutil = require('./DBUtil');
//这个函数是, 插入一个tag
function insertTag(tag, ctime, utime, success) {
    //注意这个sql语句 ,要用``  ,而不是 '' , 这两个是有区别的
    var insertSql = "insert into tags(`tag`,`ctime`,`utime`) value(?,?,?)";
    var params = [tag, ctime, utime];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function(error, result) {
        if (error == null){
            success(result)
        } else{
            console.log(error)
        }
    });
    connection.end()
}
//查询一个tag
function queryTag(tag, success) {
    //注意这个sql语句 ,要用``  ,而不是 '' , 这两个是有区别的
    var insertSql = "select * from tags where tag = ?;";
    var params = [tag];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function(error, result) {
        if (error == null){
            success(result)
        } else{
            console.log(error)
        }
    });
    connection.end()
}
module.exports.insertTag = insertTag;
module.exports.queryTag = queryTag;




