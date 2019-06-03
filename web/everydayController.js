//这里写的是,对应的url请求的处理函数, 一个接口,对应一个处理函数
var everyDayDao = require('../dao/EveryDayDao');
var timeUtil = require('../util/TimeUtil');
var respUtil = require('../util/RespUtil');
var path = new Map();

function editEveryDay(request, response) {
    //这里收到请求之后,将请求发送的data 打印出来,  我们可以把数据写入到数据库里
    request.on('data',function (data) {
        everyDayDao.insertEverDay(data.toString().trim(), timeUtil.getNow(),function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success','添加成功',null));
            response.end();
        })

        console.log('1',data.toString().trim());
        console.log('2',data)
    })
}
path.set('/editEveryDay', editEveryDay);
module.exports.path = path;












