//这是加载处理文件的, 也就是一个请求对应一个处理函数

var fs = require('fs');
// 读取全局配置
var globalConfig = require('./config.js');

var controllerSet = [];
var pathMap = new Map();
// 读取该路径下的所有文件的文件名, 然后通过文件名遍历引入各个文件,然后将
//各个文件里的map 保存到 pathMap里面, (也就是汇总)
var files = fs.readdirSync(globalConfig['web_path']);
// console.log('读取目录' , files)

for (var i = 0; i < files.length; i ++){
    // 拼装得到路径 , 读取对应的文件,得到文件被导出的 对象数据
    var temp = require('./' + globalConfig['web_path'] + '/' + files[i]);
    // 如果该对象具有path属性 , 实际上 temp.path 是一个map数据结构
    if(temp.path){
        // 遍历map数据结构 , 其实是将map 汇总到一个新map中
        for (var [key, value] of temp.path){
            if(pathMap.get(key) == null){
                pathMap.set(key, value);
            }else{
                throw new Error('url path异常, url:' + key)
            }
        }
        //这一步是为什么
        // 将读取的文件数据(map数据结构) , 存放到数组中,
        controllerSet.push(temp);
    }
}
// 导出这个新map
module.exports = pathMap;


