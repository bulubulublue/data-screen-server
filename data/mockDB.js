const path = require('path')
const dayjs = require('dayjs')
const fileReader = require('../utils/index.js').getFileJsonData
const filePath = path.join(__dirname, './salesData.json')
let data = {}
let dates = []
let datas = []
let totalOrders = 0
fileReader(filePath).then((res) => {
  data = JSON.parse(res)
  dates = data.date
  datas = data.data
  totalOrders = data.totalOrders
})

let date = dayjs(1650137397)

let addDataTimer = setInterval(() => {
  date = date.add(10, 'minute')
  // console.log(payload)
  totalOrders += 10
  dates.push(date.format('HH:mm'))
  // payload.data.date.splice(0, payload.data.date.length - 15)
  datas.push(Math.floor(Math.random() * 1000) + 1000)
  // payload.data.data.splice(0, payload.data.data.length - 15)
}, 3000)

module.exports.gePayload = () => ({
  totalOrders,
  weekGrowth: data.weekGrowth,
  date: dates.slice(-15),
  data: datas.slice(-15),
})
