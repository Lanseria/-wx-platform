import fs from 'fs'
import path from 'path'

export const firstUser = 0
export const port = 7780
export const dbUrl = 'mongodb://localhost/wxplatform'

const cookiefile = path.resolve(__dirname, '../cookie')
const txt = fs.readFileSync(cookiefile)

export function returnCookie () {
  return txt
}

export const wxUrl = 'https://mp.weixin.qq.com/cgi-bin'

export const referer = 'https://mp.weixin.qq.com/cgi-bin/appmsg?t=media/appmsg_edit_v2&action=edit&isNew=1&type=10&lang=zh_CN&token='

export const host = 'mp.weixin.qq.com'

export const token = 166230629

export function fakeMpReqParam (query) {
  return {
    action: 'search_biz',
    token: token,
    lang: 'zh_CN',
    f: 'json',
    ajax: 1,
    random: 0.6675306839370696,
    query: query,
    begin: 0,
    count: 1
  }
}

export function fakeAtReqParam (fakeid) {
  return {
    token: token,
    lang: 'zh_CN',
    f: 'json',
    ajax: 1,
    random: 0.3452193238554264,
    action: 'list_ex',
    begin: 0,
    count: 5,
    query: '',
    fakeid: fakeid,
    type: 9
  }
}
/**
 * 增加一个可以使用图片链接的属性
 * @param {*微信原始数据} jsonpData
 */
export function addAntiTheftChainProcess (jsonpData) {
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
