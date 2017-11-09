import fs from 'fs'
import path from 'path'
const cookiefile = path.resolve('.', 'cookie')
const txt = fs.readFileSync(cookiefile)

export function returnCookie () {
  return txt
}

export const wxUrl = 'https://mp.weixin.qq.com/cgi-bin'

export const token = 798386145
