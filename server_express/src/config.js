import fs from 'fs'
import path from 'path'

export const firstUser = 0
export const port = 7780
export const dbUrl = 'mongodb://localhost/wxplatform'

const cookiefile = path.resolve(__dirname, '../cookie')
const txt = fs.readFileSync(cookiefile)

export function returnCookie() {
  return txt
}

export const wxUrl = 'https://mp.weixin.qq.com/cgi-bin'

export const referer = 'https://mp.weixin.qq.com/cgi-bin/appmsg?t=media/appmsg_edit_v2&action=edit&isNew=1&type=10&lang=zh_CN&token='

export const host = 'mp.weixin.qq.com'

export const token = 166230629
