const fs = require('fs')
var txt = fs.readFileSync('./cookie')
module.exports = function returnCookie () {
  return txt
}
