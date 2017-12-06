import mongoose from 'mongoose'
import {
  wxUrl,
  dbUrl,
  fakeMpReqParam,
  fakeAtReqParam,
  addAntiTheftChainProcess
} from './config'
import getter from './api/getter'
// import { ERR_OK } from './api/config'
import { saveAndUpdateRecord,
  saveAndUpdateMediaPlatform,
  saveAndUpdateArticle } from './mongo/app'

let promise = mongoose.createConnection(dbUrl, {
  useMongoClient: true
})

promise.then(async function (db) {
  const mediaName = '中大青年'

  const SEARCHBIZ = 'searchbiz'
  const APPMSG = 'appmsg'

  const mpUrl = `${wxUrl}/${SEARCHBIZ}`
  const atUrl = `${wxUrl}/${APPMSG}`

  async function getMediaPlatformInformation () {
    let mp = await getter(mpUrl, fakeMpReqParam(mediaName))
    if (mp.base_resp.ret === 200040) {
      console.log(mp.base_resp.err_msg)
      console.log(` ! 警告 > 请检查 token 数值`)
      return
    } else if (mp.base_resp.ret !== 0) {
      console.log(mp.base_resp.err_msg)
      console.log(` ! 警告 > 请检查 cookie 文件更新`)
      return
    }
    mp = addAntiTheftChainProcess(mp)

    await saveAndUpdateRecord(mediaName, mp, SEARCHBIZ)
    for (const sMediaPlatform of mp.list) {
      const data = await saveAndUpdateMediaPlatform(sMediaPlatform)
      await getArticleInformation(data)
    }
  }
  async function getArticleInformation (mp) {
    let at = await getter(atUrl, fakeAtReqParam(mp.fakeid))
    at = addAntiTheftChainProcess(at)
    let articleList = at.app_msg_list
    for (const article of articleList) {
      await saveAndUpdateArticle(article)
    }
  }
  getMediaPlatformInformation().then(() => {
    mongoose.disconnect()
  })
})
