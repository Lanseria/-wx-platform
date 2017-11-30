import axios from 'axios'
import {
  returnCookie,
  token,
  host,
  referer
} from '../config'

export default async function getter (url, req) {
  try {
    const result = await axios.get(url, {
      headers: {
        referer: referer + token,
        host: host,
        cookie: returnCookie()
      },
      params: req.query
    })
    return result.data
  } catch (error) {
    console.log(error)
    return error
  }
}