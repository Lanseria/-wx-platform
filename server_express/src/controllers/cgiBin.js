import {
  wxUrl,
  addAntiTheftChainProcess
} from '../config'
import getter from '../api/getter'
import { ERR_OK } from '../api/config'

export function judgeProxyName (req, res, next) {
  const paramsName = ['searchbiz', 'appmsg']
  if (req.params.n == paramsName[0] || req.params.n == paramsName[1]) {
    next()
  } else {
    res.send('error api interface')
  }
}

export async function searchbiz (req, res, next) {
  const url = wxUrl + '/searchbiz'
  res.locals.jsonp = await getter(url, req.query)
  next()
}

export async function appmsg (req, res, next) {
  const url = wxUrl + '/appmsg'
  res.locals.jsonp = await getter(url, req.query)
  next()
}

export async function processProxy (req, res) {
  function _handleJsonpCallBack (jsonpString) {
    const jsonpCallback = req.query.jsonpCallback || 'wxJsonpCallback' // 这句可以省略
    return `${jsonpCallback}(${JSON.stringify(jsonpString)})`
  }
  let jsonpData = res.locals.jsonp
  const url = `${wxUrl}/${req.params.n}`
  if (jsonpData) {
    if (ERR_OK === jsonpData.base_resp.ret) {
      jsonpData = addAntiTheftChainProcess(jsonpData) // 防盗链处理
      res.send(_handleJsonpCallBack(jsonpData))
    } else {
      res.send(_handleJsonpCallBack({
        base_resp: {
          ret: 1,
          err_msg: `cookie file is not update, error at url: ${url}`
        }
      }))
    }
    console.log(jsonpData.base_resp.ret, url)
  } else {
    res.send(_handleJsonpCallBack({
      base_resp: {
        ret: 2,
        err_msg: `server error, error at url: ${url}`
      }
    }))
  }
}
