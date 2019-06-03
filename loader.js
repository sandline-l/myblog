//这是加载处理文件的, 也就是一个请求对应一个处理函数

var fs = require('fs');
var globalConfig = require('./config.js');

var controllerSet = [];
var pathMap = new Map();
// 读取该路径下的所有文件的文件名, 然后通过文件名遍历引入各个文件,然后将
//各个文件里的map 保存到 pathMap里面, (也就是汇总)
var files = fs.readdirSync(globalConfig['web_path']);

for (var i = 0; i < files.length; i ++){
    var temp = require('./' + globalConfig['web_path'] + '/' + files[i]);
    if(temp.path){
        for (var [key, value] of temp.path){
            if(pathMap.get(key) == null){
                pathMap.set(key, value);
            }else{
                throw new Error('url path异常, url:' + key)
            }
        }
        //这一步是为什么
        controllerSet.push(temp);
    }
}

module.exports = pathMap;


