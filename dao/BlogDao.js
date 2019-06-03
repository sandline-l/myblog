// 将传过来的数据写入数据库
var dbutil = require('./DBUtil');

function insertBlog(title, tags, views, content, ctime, utime, success) {
    //注意这个sql语句 ,要用``  ,而不是 '' , 这两个是有区别的
    var insertSql = "insert into blog(`title`,`tags`,`views`,`content`,`ctime`,`utime`) value(?,?,?,?,?,?)";
    var params = [title, tags, views, content, ctime, utime];
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
module.exports.insertBlog = insertBlog;




