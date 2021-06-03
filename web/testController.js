


// let url = require('url');
let path = new Map()
var respUtil = require('../util/RespUtil');

function queryMsgById(request, response){
    console.log('调用了接口')
    response.writeHead(200)
    // response.write(`{
    //     status: 'success',
    //     msg:'查询成功',
    //     data:{
    //         msg:'你好'
    //     }
    // }`)
    response.write(respUtil.writeResult('success','查询成功','你好'));
    response.end()
}

path.set('/queryMsgById',queryMsgById)

module.exports.path = path