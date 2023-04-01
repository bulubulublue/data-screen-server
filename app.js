const webSocketService = require('./service/server.js')
webSocketService.listen()

/*
{
action:'getData',
socketType:'trendData', //前端响应函数标识
chartName:'trend',
value:''
}

*/
