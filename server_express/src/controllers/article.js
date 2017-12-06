import { dbUrl } from '../config'
import { consoleType } from '../util/console'
import * as _ from 'lodash'

const mongoose = require('mongoose')
const Article = require('../models/article')
mongoose.Promise = require('bluebird')
mongoose.connect(dbUrl, {
  useMongoClient: true
})

export async function getNormalArticles (req, res) {
  try {
    const articles = await Article.find({})
    if (articles) {
      res.status(200).send(consoleType(0, '成功', `获取到 ${articles.length} 篇文章`, {
        data: filterArticles(articles)
      }))
    }
  } catch (error) {
    res.status(404).send(consoleType(2, '服务器或数据库错误'))
  }
}

function filterArticles (articles) {
  return articles.map(m => _.pick(m, ['_id', 'appmsgid', 'ATC_cover', 'link', 'title', 'digest', 'update_time']))
}
