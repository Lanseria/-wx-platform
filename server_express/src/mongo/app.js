import mongoose from 'mongoose'
import crypto from 'crypto'
import * as _ from 'lodash'
import {
  dbUrl
} from '../config'
// Models
const Record = require('../models/record')
const MediaPlatform = require('../models/mediaPlatform')
const Article = require('../models/article')

mongoose.Promise = require('bluebird')
mongoose.connect(dbUrl, {
  useMongoClient: true
})
/**
 * 将抓取来的搜索出来的公众号信息（个体）保存到数据库
 * @param {*指定的关键词} mediaName
 * @param {*原始数据有关mediaPlatform} mp
 * @param {*抓包类型--属于公众号} paramUrl
 */
export async function saveAndUpdateRecord (mediaName, mp, paramUrl) {
  let record = new Record()
  record.query = mediaName
  record.paramUrl = paramUrl
  record.jsonData = JSON.stringify(mp)
  const hash = crypto.createHash('sha256')
  record.hash = hash.update(record.jsonData).digest('hex')
  let _record = await Record.findOne({ query: mediaName, paramUrl: paramUrl })
  if (_record) {
    console.log(` - 更新: 关键词: ${_record.query} 修改成功`)
    _record = _.extend(record, _record)
    const data = await _record.save()
    return data
  } else {
    console.log(` - 插入: ${_record.query} 插入成功`)
    const data = await record.save()
    return data
  }
}

export async function saveAndUpdateMediaPlatform (sMediaPlatform) {
  let mediaPlatform = new MediaPlatform(sMediaPlatform)
  try {
    mediaPlatform = await mediaPlatform.save()
    console.log(` √ 插入成功: 公众号 <${mediaPlatform.nickname}>, alias: ${mediaPlatform.alias}`)
    return mediaPlatform
  } catch (error) {
    console.log(` ! 重复: 公众号 <${mediaPlatform.nickname}>, alias: ${mediaPlatform.alias}`)
    return sMediaPlatform
  }
}

export async function saveAndUpdateArticle (sArticle) {
  let _article = new Article(sArticle)
  try {
    await _article.save()
    console.log(` √ 插入成功: 文章 <${sArticle.title}>, appmsgid: ${sArticle.appmsgid}`)
  } catch (error) {
    console.log(` ! 重复: 文章 <${sArticle.title}>, appmsgid: ${sArticle.appmsgid}`)
  }
}
