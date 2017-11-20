const mongoose = require('mongoose')
//Models
const Record = require('./models/record')

const dbUrl = 'mongodb://localhost/wxplatform'
mongoose.Promise = require('bluebird')
mongoose.connect(dbUrl)



export async function writeInMongo (url, json_data) {
  let record = new Record()
  record.url = url
  record.json_data = json_data
  console.log(url)
  return await record.save((err, res) => {
    if (err) {
      return err
    }
    console.log(`url:${url} were read in!`)
    return res
  })
}
