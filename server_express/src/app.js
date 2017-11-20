import axios from 'axios'
import express from 'express'
import {
  returnCookie,
  wxUrl,
  token,
  host,
  referer
} from './config'
import { writeInMongo } from './writeRecords'

const port = 7780

let app = express()
let apiRouters = express.Router()

apiRouters.get('/:n', function (req, res, next) {
  const paramsName = ['searchbiz', 'appmsg']
  if (req.params.n == paramsName[0] || req.params.n == paramsName[1]) {
    next()
  } else {
    res.send('error api interface')
  }
})

apiRouters.get('/searchbiz', function (req, res, next) {
  const url = wxUrl + '/searchbiz'
  axios.get(url, {
    headers: {
      referer: referer + token,
      host: host,
      cookie: returnCookie()
    },
    params: req.query
  }).then((response) => {
    res.locals.jsonp = response.data
    next()
  }).catch(e => {
    console.log(e)
  })
})

/**
 * 通过微信公众号返回文章的转发api
 */
apiRouters.get('/appmsg', function (req, res, next) {
  const url = wxUrl + '/appmsg'
  axios.get(url, {
    headers: {
      referer: referer + token,
      host: host,
      cookie: returnCookie()
    },
    params: req.query
  }).then((response) => {
    res.locals.jsonp = response.data
    next()
  }).catch(e => {
    console.log(e)
  })
})

apiRouters.get('/:n', function (req, res) {
  req.query.jsonpCallback = req.query.jsonpCallback || 'wxJsonpCallback'
  res.send(`${req.query.jsonpCallback}(${JSON.stringify(res.locals.jsonp)})`)
  const url = `${wxUrl}/${req.params.n}`
  // try {
  //   const con = await writeInMongo(url, res)
  //   console.log(con)
  // } catch (error) {
  //   console.log(error)
  // }
})

app.use('/api', apiRouters)


export default app

app.listen(port, function () {
  console.log(`app is listening at port ${port}`)
})
