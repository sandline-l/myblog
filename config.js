//这个文件是加载server.conf配置文件的, 然后导出为一个对象

var fs = require('fs');
var globalConfig = {};
var conf = fs.readFileSync('./server.conf');

//注意写server.conf文件的时候,后面不能有多余的空格,要刚刚好
var configArr = conf.toString().split('\r\n');
for(var i = 0;i < configArr.length ; i++){
    globalConfig[configArr[i].split('=')[0].trim()] = configArr[i].split('=')[1].trim()
}

module.exports = globalConfig;








