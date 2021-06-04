// 将传过来的数据写入数据库
// 导入用来连接数据库的 函数
var dbutil = require('./DBUtil');
/** 导入的实际就是 module.exports 对象 , 如下:
 * dbutil = { createConnection: fn}
 */
// 插入博客到数据库
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
// 分页查询 博客数据
function queryBlogByPage(page, pageSize, success) {
    //注意这个sql语句 ,要用``  ,而不是 '' , 这两个是有区别的
    var insertSql = "select * from blog order by id desc limit ?,?;";
    var params = [page * pageSize, pageSize];
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
// 查询博客总数量
function queryBlogcount(success) {
    //注意这个sql语句 ,要用``  ,而不是 '' , 这两个是有区别的
    var insertSql = "select count(1) as count from blog;";
    var params = [];
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
// 该函数是用来操作数据库的, 得到结果后, 执行success函数,并传入查询结果
// 通过id 查询 博客
function queryBlogById(id, success) {
    //注意这个sql语句 ,要用``  ,而不是 '' , 这两个是有区别的
    var querySql = "select * from blog where id = ?;";
    var params = [id];
    // 创建连接
    var connection = dbutil.createConnection();
    // 连接
    connection.connect();
    // 执行sql语句
    connection.query(querySql, params, function(error, result) {
        if (error == null){
            success(result)
        } else{
            console.log(error)
        }
    });
    // 断开连接
    connection.end()
}

// 导出所有的 方法
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.insertBlog = insertBlog;
module.exports.queryBlogcount = queryBlogcount;
module.exports.queryBlogById = queryBlogById;




