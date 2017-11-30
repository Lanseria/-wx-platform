import {
  wxUrl,
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
  res.locals.jsonp = await getter(url, req)
  next()
}

export async function appmsg (req, res, next) {
  const url = wxUrl + '/appmsg'
  res.locals.jsonp = await getter(url, req)
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
/**
 * 增加一个可以使用图片链接的属性
 * @param {*微信原始数据} jsonpData 
 */
function addAntiTheftChainProcess (jsonpData) {
  if (jsonpData.list) {
    jsonpData.list.forEach(item => {
      item.ATC_round_head_img = `/img?url=${item.round_head_img}`
    })
  }
  if (jsonpData.app_msg_list) {
    jsonpData.app_msg_list.forEach(item => {
      item.ATC_cover = `/img?url=${item.cover}`
    })
  }
  return jsonpData
}
