import axios from 'axios'
import Koa from 'koa'
import route from 'koa-route'

import {
  returnCookie,
  wxUrl,
  token,
  host,
  referer
} from './config'
import { writeInMongo } from './writeRecords'

const port = 7780

const app = new Koa()

const getWxPlatform = ctx => {
  const url = wxUrl + '/searchbiz'
  axios.get(url, {
    headers: {
      referer: referer + token,
      host: host,
      cookie: returnCookie()
    },
    params: ctx.request.query
  }).then(async (response) => {
    ctx.request.query.jsonpCallback = ctx.request.query.jsonpCallback || 'wxJsonpCallback'
    try {
      const con = await writeInMongo(url, response.data)
      console.log(con)
    } catch (error) {
      console.log(error)
    }
    ctx.response.body = ctx.request.query.jsonpCallback + '(' + JSON.stringify(response.data) + ')'
  }).catch(e => {
    console.log(e)
  })
}

/**
 * 通过微信公众号返回文章的转发api
 */
const getWxNewsList = ctx => {
  const url = wxUrl + '/appmsg'
  axios.get(url, {
    headers: {
      referer: referer + token,
      host: host,
      cookie: returnCookie()
    },
    params: ctx.request.query
  }).then(async(response) => {
    ctx.request.query.jsonpCallback = ctx.request.query.jsonpCallback || 'wxJsonpCallback'
    try {
      const con = await writeInMongo(url, JSON.stringify(response.data))
    } catch (error) {
      console.log(error)
    }
    ctx.response.body = ctx.request.query.jsonpCallback + '(' + JSON.stringify(response.data) + ')'
  }).catch(e => {
    console.log(e)
  })
}

app.use(route.get('/api/getWxPlatform', getWxPlatform))
app.use(route.get('/api/getWxNewsList', getWxNewsList))

export default app

app.listen(port, () => {
  console.log(`app is listening at port ${port}`)
})
