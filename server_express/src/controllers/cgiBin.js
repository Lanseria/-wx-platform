import axios from 'axios'
import {
  returnCookie,
  wxUrl,
  token,
  host,
  referer
} from '../config'

export function judgeProxyName (req, res, next) {
  const paramsName = ['searchbiz', 'appmsg']
  if (req.params.n == paramsName[0] || req.params.n == paramsName[1]) {
    next()
  } else {
    res.send('error api interface')
  }
}

export function searchbiz (req, res, next) {
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
}

export function appmsg (req, res, next) {
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
}

export async function processProxy (req, res) {
  req.query.jsonpCallback = req.query.jsonpCallback || 'wxJsonpCallback'
  res.send(`${req.query.jsonpCallback}(${JSON.stringify(res.locals.jsonp)})`)
  const url = `${wxUrl}/${req.params.n}`
}
