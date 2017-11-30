var mongoose = require('mongoose')
var Schema = mongoose.Schema
// var ObjectId = Schema.Types.ObjectId
var MediaPlatformSchema = new Schema({
  alias: {
    type: String,
    unique: true
  },
  fakeid: {
    type: String,
    unique: true
  },
  nickname: {
    type: String
  },
  round_head_img: {
    type: String
  },
  ATC_round_head_img: {
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
MediaPlatformSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})
MediaPlatformSchema.statics = {
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
module.exports = MediaPlatformSchema
