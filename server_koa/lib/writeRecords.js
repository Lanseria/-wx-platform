'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeInMongo = writeInMongo;
const mongoose = require('mongoose');
//Models
const Record = require('./models/record');

const dbUrl = 'mongodb://localhost/wxplatform';
mongoose.connect(dbUrl);

function writeInMongo(url, json_data, cb) {
  let record = new Record();
  record.url = url;
  record.json_data = json_data;
  record.save(err => {
    if (err) {
      console.log(err);
    }
    console.log(`url:${url} were read in!`);
    cb();
  });
}