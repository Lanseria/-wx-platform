var mongoose = require('mongoose')
var Schema = mongoose.Schema
// var ObjectId = Schema.Types.ObjectId
var ArticleSchema = new Schema({
  aid: {
    type: String,
    unique: true
  },
  appmsgid: {
    type: String
  },
  cover: {
    type: String
  },
  ATC_cover: {
    type: String
  },
  digest: {
    type: String
  },
  itemidx: {
    type: String
  },
  link: {
    type: String
  },
  title: {
    type: String
  },
  update_time: {
    type: String
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})
ArticleSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})
ArticleSchema.statics = {
  fetch: (cb) => {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById: (id, cb) => {
    return this
      .findOne({
        _id: id
      })
      .exec(cb)
  }
}
module.exports = ArticleSchema
