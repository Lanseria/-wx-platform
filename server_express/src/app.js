import express from 'express'
import superagent from 'superagent'
import apiRouters from './routes/cgiBin'
import bodyParser from 'body-parser'
import logger from 'morgan'

import { port } from './config'

let app = express()
app.use(bodyParser.json())



// 微信防盗链，但是不支持下载，只能放在img src中可以显示
/**
 * from https://github.com/44886/imgBridge/blob/master/imgBridge.js
 */
app.get('/img', function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'image/*'
  })
  let url = req.query.url
  if (!url) {
    res.send("")
    return false
  }
  superagent.get(req.query.url)
    .set('Referer', '')
    .set("User-Agent",
    'User-Agent:Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.80 Safari/537.36 Core/1.47.933.400 QQBrowser/9.4.8699.400'
    )
    .end(function (err, result) {
      if (err) {
        //res.send(err)
        return false
      }
      res.end(result.body)
      return
    })
})
app.use('/api', apiRouters)
var env = process.env.NODE_ENV || 'development'
if ('development' === env) {
  app.set('showStackError', true)
  app.use(logger(':method :url :status'))
  app.locals.pretty = true
}

export default app

app.listen(port, function () {
  console.log(`app is listening at port ${port}`)
})
