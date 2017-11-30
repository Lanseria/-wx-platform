import axios from 'axios'
import {
  returnCookie,
  token,
  host,
  referer
} from '../config'
/**
 * 利用 axios 工具进行 csrf 获取 wx_api 数据
 * @param {*抓取链接} url
 * @param {*get 参数对象列表} query
 */
export default async function getter (url, query) {
  try {
    const result = await axios.get(url, {
      headers: {
        referer: referer + token,
        host: host,
        cookie: returnCookie()
      },
      params: query
    })
    return result.data
  } catch (error) {
    console.log(error)
    return error
  }
}
