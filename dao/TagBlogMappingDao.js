// 将传过来的数据写入数据库
var dbutil = require('./DBUtil');
//这个函数是, 插入一个tag_blog_mapping
function insertTagBlogMapping(tag_id, blog_id, ctime, utime, success) {
    //注意这个sql语句 ,要用``  ,而不是 '' , 这两个是有区别的
    var insertSql = "insert into tag_blog_mapping(`tag_id`, `blog_id`, `ctime`,`utime`) value(?,?,?,?)";
    var params = [tag_id, blog_id, ctime, utime];
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

module.exports.insertTagBlogMapping = insertTagBlogMapping;




