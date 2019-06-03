//这里写的是,对应的url请求的处理函数, 一个接口,对应一个处理函数
var BlogDao = require('../dao/BlogDao');
var tagDao = require('../dao/TagDao');
var tagBlogMappingDao = require('../dao/TagBlogMappingDao');
var timeUtil = require('../util/TimeUtil');
var respUtil = require('../util/RespUtil');

var url = require('url');
var path = new Map();

//编辑博客后, 将编辑的数据,存放到数据库里面去
function editBlog(request, response) {
    var params = url.parse(request.url, true).query;
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
module.exports.path = path;












