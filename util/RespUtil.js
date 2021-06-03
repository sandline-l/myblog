// 这个函数 , 组装出准备返回给客户端的数据
function writeResult(status, msg, data) {
    return JSON.stringify({status: status,msg: msg, data: data})
}

module.exports.writeResult = writeResult;