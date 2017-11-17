import axios from 'axios'
import express from 'express'

const port = 7780

let app = express()
let apiRouters = express.Router()
let Routers = express.Router()

import {
  returnCookie,
  wxUrl,
  token,
  host,
  referer
} from './config'

apiRouters.get('/getWxPlatform', function (req, res) {
  const url = wxUrl + '/searchbiz'
  axios.get(url, {
    headers: {
      referer: referer + token,
      host: host,
      cookie: returnCookie()
    },
    params: req.query
  }).then((response) => {
    req.query.jsonpCallback = req.query.jsonpCallback || 'wxJsonpCallback'
    res.send(req.query.jsonpCallback + '(' + JSON.stringify(response.data) + ')')
  }).catch(e => {
    console.log(e)
  })
})

/**
 * 通过微信公众号返回文章的转发api
 */
apiRouters.get('/getWxNewsList', function (req, res) {
  const url = wxUrl + '/appmsg'
  axios.get(url, {
    headers: {
      referer: referer + token,
      host: host,
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

app.use('/api', apiRouters)

export default app

app.listen(port, function () {
  console.log(`app is listening at port ${port}`)
})
