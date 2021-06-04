


// let url = require('url');
let TestDao = require('../dao/TestDao')
let path = new Map()
var respUtil = require('../util/RespUtil');

// 创建一个表
function queryMsgById(request, response){
    console.log('调用了接口')
    // 创建一个数据库的表
    TestDao.createDB(function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult('success','查询成功',result));
        response.end();
    })
}
// function queryMsgById(request, response){
//     console.log('调用了接口')
//     response.writeHead(200)
//     // response.write(`{
//     //     status: 'success',
//     //     msg:'查询成功',
//     //     data:{
//     //         msg:'你好'
//     //     }
//     // }`)
//     response.write(respUtil.writeResult('success','查询成功','你好'));
//     response.end()
// }

path.set('/queryMsgById',queryMsgById)

module.exports.path = path

