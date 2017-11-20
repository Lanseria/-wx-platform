'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var RecordSchema = new Schema({
  url: {
    type: String
  },
  json_data: {
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
});
RecordSchema.pre('save', next => {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  next();
});
RecordSchema.statics = {
  fetch: cb => {
    return this.find({}).sort('meta.updateAt').exec(cb);
  },
  findById: (id, cb) => {
    return this.findOne({
      _id: id
    }).exec(cb);
  }
};
module.exports = RecordSchema;