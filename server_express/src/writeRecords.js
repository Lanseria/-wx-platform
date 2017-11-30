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

mongoose.Promise = require('bluebird')
mongoose.connect(dbUrl, {
  useMongoClient: true
})

const mediaName = '中大青年'

const SEARCHBIZ = 'searchbiz'
const APPMSG = 'appmsg'

const mpUrl = `${wxUrl}/${SEARCHBIZ}`
const atUrl = `${wxUrl}/${APPMSG}`

async function getMediaPlatformInformation () {
  let mp = await getter(mpUrl, fakeMpReqParam(mediaName))

  mp = addAntiTheftChainProcess(mp)

  await saveAndUpdateRecord(mediaName, mp, SEARCHBIZ)

  for (const sMediaPlatform of mp.list) {
    const data = await saveAndUpdateMediaPlatform(sMediaPlatform)
    await getArticleInformation(data)
  }
}
async function getArticleInformation (mp) {
  const at = await getter(atUrl, fakeAtReqParam(mp.fakeid))
  let articleList = at.app_msg_list
  for (const article of articleList) {
    await saveAndUpdateArticle(article)
  }
}
getMediaPlatformInformation()
