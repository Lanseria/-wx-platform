import mongoose from 'mongoose'
import crypto from 'crypto'
import {
  wxUrl,
  dbUrl,
  fakeMpReqParam,
  fakeAtReqParam,
  addAntiTheftChainProcess
} from './config'
import getter from './api/getter'
import { ERR_OK } from './api/config'

//Models
const Record = require('./models/record')
const MediaPlatform = require('./models/mediaPlatform')
const Article = require('./models/article')

mongoose.Promise = require('bluebird')
mongoose.connect(dbUrl, {
  useMongoClient: true
})

const mediaName = '中大青年'

const SEARCHBIZ = 'searchbiz'
const APPMSG = 'appmsg'

const mpUrl = `${wxUrl}/${SEARCHBIZ}`
const atUrl = `${wxUrl}/${APPMSG}`

let sMediaPlatform = null

async function writeRecord(mediaName, mp, paramUrl) {
  let record = new Record()
  record.query = mediaName
  record.paramUrl = paramUrl
  record.jsonData = JSON.stringify(mp)
  const hash = crypto.createHash('sha256')
  record.hash = hash.update(record.jsonData).digest('hex')
  const mongores = await record.save((err, res) => {
    if (err) {
      console.log('database error', err)
      return
    }
    console.log(`url:${record.paramUrl} were read in!`)
    // console.log(res)
    return res
  })
  // console.log(mongores)
}

async function getMediaPlatformInformation () {
  let mp = await getter(mpUrl, fakeMpReqParam(mediaName))

  mp = addAntiTheftChainProcess(mp)

  await writeRecord(mediaName, mp, SEARCHBIZ)

  // 只保存一条
  sMediaPlatform = mp.list[0]

  let mediaPlatform = new MediaPlatform(sMediaPlatform)
  mediaPlatform = await mediaPlatform.save((err, mp) => {
    if (err) {
      console.log(err)
      return
    }
    console.log(`mediaPlatform insert to data suc`)
    return mp
  })
  return mediaPlatform
}
async function getArticleInformation (mp) {
  const at = await getter(atUrl, fakeAtReqParam(mp.fakeid))
  let articleList = at.app_msg_list
  articleList.map(async (article) => {
    let _article = new Article(article)
    await _article.save((err, at) => {
      if (err) {
        console.log(err)
        return
      }
      console.log(`_article insert to data suc`)
    })
  })
  // console.log(articleList)
}
getMediaPlatformInformation()
  .then((mp) => {
    getArticleInformation(mp)
  })
