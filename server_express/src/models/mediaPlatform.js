var mongoose = require('mongoose')
var mediaPlatformSchema = require('../schemas/mediaPlatform')
var mediaPlatform = mongoose.model('MediaPlatform', mediaPlatformSchema)

module.exports = mediaPlatform
