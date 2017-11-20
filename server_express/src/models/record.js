var mongoose = require('mongoose')
var recordSchema = require('../schemas/record')
var record = mongoose.model('Record', recordSchema)

module.exports = record
