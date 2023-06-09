// 服务端代码，通过node server.js启动
var Websocket = require('websocket').server
var http = require('http')

const db = require('../data/mockDB.js')
let timer

var httpServer = http.createServer().listen(8080, () => {
  console.log('create server success')
})

var wsServer = new Websocket({
  httpServer,
  // 是否允许跨域，但当连接建立之后，ws是不受跨域影响
  autoAcceptConnections: false,
})

// 接收客户端发送过来的请求
module.exports.listen = () => {
  wsServer.on('request', (req) => {
    var connection = req.accept()

    //接收客户端发送来的信息
    connection.on('message', async (msg) => {
      console.log(msg) //{ type: 'utf8', utf8Data: '{"functionName":"test"}' }
      const payload = JSON.parse(msg.utf8Data)
      if (payload.action === 'getData') {
        payload.data = db.gePayload()
        connection.send(JSON.stringify(payload))
        // console.log(payload)
        // // 推送数据给客户端
        timer = setInterval(() => {
          payload.data = db.gePayload()
          connection.send(JSON.stringify(payload)) // 传递对象需要使用JSON.stringify
        }, 3000)
      } else if (payload.action === 'unmount') {
        timer && clearInterval(timer)
      }
    })
  })
}
