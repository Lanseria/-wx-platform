var axios = require('axios')
var express = require('express')

var port = 3090

var app = express()
var apiRouters = express.Router()
var Routers = express.Router()

var returnCookie = require('./temp')

apiRouters.get('/getWxNewsList', function (req, res) {
  var url = 'https://mp.weixin.qq.com/cgi-bin/appmsg'
  axios.get(url, {
    headers: {
      referer: 'https://mp.weixin.qq.com/cgi-bin/appmsg?t=media/appmsg_edit_v2&action=edit&isNew=1&type=10&lang=zh_CN&token=1214495473',
      host: 'mp.weixin.qq.com',
      cookie: returnCookie()
    },
    params: req.query
  }).then((response) => {
    req.query.jsonpCallback = req.query.jsonpCallback || 'wxJsonpCallback'
    res.send( req.query.jsonpCallback + '(' + JSON.stringify(response.data) + ')')
  }).catch(e => {
    console.log(e)
  })
})

Routers.get('/img.jpg', function (req, res, next) {
  let url = req.query.url
  if (!url) {
    res.send('')
    return false
  }
  axios.get(req.query.url, {
    headers: {
      host: 'mmbiz.qpic.cn',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.79 Safari/537.36',
      cookie: returnCooke()
    }
  }).then((response) => {
    res.writeHead(200, {
      'Content-Type': 'image/*'
    })
    res.end(response.data)
  }).catch(e => {
    console.log(e)
  })
})

app.use('/api', apiRouters)
app.use('/', Routers)

module.exports = app

app.listen(port, function () {
  console.log(`app is listening at port ${port}`)
})
