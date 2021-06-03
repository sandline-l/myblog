//这里写的是,对应的url请求的处理函数, 一个接口,对应一个处理函数
/** 这里的目的是写 url 的处理函数.  组织方式是, 使用map 结构 保存这些 处理函数. 
 * 之后调用的时候, 直接使用改map 结构, 就可以通过 url 来找到与之对应的 处理函数
 *  
 */
var BlogDao = require('../dao/BlogDao');
var tagDao = require('../dao/TagDao');
var tagBlogMappingDao = require('../dao/TagBlogMappingDao');
var timeUtil = require('../util/TimeUtil');
var respUtil = require('../util/RespUtil');

var url = require('url');
var path = new Map();

//通过id查找文章内容
function queryBlogById(request,response) {
    var params = url.parse(request.url, true).query;
    // 调用函数,操作数据库, 得到数据库的结果,执行对应的success函数
    BlogDao.queryBlogById(parseInt(params.bid),function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success','查询成功',result));
        response.end();
    })
}
// 将处理函数 存到map 结构中
path.set('/queryBlogById',queryBlogById);


//通过page来查询博客的接口函数,对应的url为 '/queryBlogByPage?page='+(page-1)+'&pageSize='+pageSize
function queryBlogByPage(request, response) {
    var params = url.parse(request.url, true).query;
    BlogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize),function (result) {
        for (var i = 0; i < result.length; i++) {
            //将img去掉,将标签也去掉
            result[i].content = result[i].content.replace(/<img[\w\W]*">/,'');
            result[i].content = result[i].content.substring(0,300);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult('success','查询成功',result));
        response.end();
    })
}
path.set('/queryBlogByPage',queryBlogByPage);

//查询总博客条数
function queryBlogcount(request, response) {
    BlogDao.queryBlogcount(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success','查询成功',result));
        response.end();
    })
}
path.set('/queryBlogcount',queryBlogcount);

//编辑博客后, 将编辑的数据,存放到数据库里面去
function editBlog(request, response) {
    var params = url.parse(request.url, true).query;
    console.log('参数', params)
    //将标签里面的空格去掉, 并且处理英文逗号和中文逗号
    var tags = params.tags.replace(/ /g, '').replace(',', ',');
    //这里收到请求之后,将请求发送的data 写入数据库, 调用的是dao的方法.
    request.on('data',function (data) {
        BlogDao.insertBlog( params.title, tags, 0, data.toString(), timeUtil.getNow(), timeUtil.getNow(),function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success','添加成功',null));
            response.end();
            var blogId = result.insertId;
            var tagList = tags.split(',');
            for (var i = 0; i < tagList.length; i++) {
                if (tagList[i] == ''){
                    continue;
                }
                queryTag(tagList[i],blogId)
            }
        })
        console.log('1',data.toString().trim());
        console.log('2',data)
    })
}
//插入标签
function queryTag(tag, blogId){
    tagDao.queryTag(tag,function (result) {     //result 是我们再数据库里查出来的一个结果
        //没有标签时, 插入一个标签 . 有的时候, 创建一个标签和博客的映射
        if (result == null || result.length == 0) {
            insertTag(tag, blogId);
        }else{
            tagBlogMappingDao.insertTagBlogMapping(result[0].id, blogId)
        }
    })
}
//这个是没有标签的时候,我们插入一个标签, 然后再插入映射
function insertTag(tag, blogId){
    tagDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        insertTagBlogMapping(result.insertId, blogId)
    })
}
//插入标签和博客的映射
function insertTagBlogMapping(tagId, blogId){
    tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), function (result) {})
}

//将方法 和 url对应起来 ,然后导出
path.set('/editBlog', editBlog);
// 导出map
module.exports.path = path;












