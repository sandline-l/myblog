var express = require('express');

var globalConfig = require('./config.js');

//loader导出的是一个map对象,包含url和对象的处理函数
var loader = require('./loader.js');

var app = new express();

app.use(express.static('./page/'));

//根据请求的路径 ,来执行对象的处理函数
app.post('/editEveryDay', loader.get('/editEveryDay'));

app.post('/editBlog', loader.get('/editBlog'));

//第二个参数是处理函数, 他是在map数据里取出来的
app.get('/queryBlogByPage', loader.get('/queryBlogByPage'));

app.get('/queryBlogcount', loader.get('/queryBlogcount'));

app.get('/queryBlogById', loader.get('/queryBlogById'));

app.listen(globalConfig.port,function(){
    console.log('服务器已启动')
});

console.log('网站在localhost:12306/page/edit_blog.html');






