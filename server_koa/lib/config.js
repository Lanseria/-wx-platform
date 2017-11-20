'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.token = exports.host = exports.referer = exports.wxUrl = undefined;
exports.returnCookie = returnCookie;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cookiefile = _path2.default.resolve(__dirname, '../cookie');
const txt = _fs2.default.readFileSync(cookiefile);

function returnCookie() {
  return txt;
}

const wxUrl = exports.wxUrl = 'https://mp.weixin.qq.com/cgi-bin';

const referer = exports.referer = 'https://mp.weixin.qq.com/cgi-bin/appmsg?t=media/appmsg_edit_v2&action=edit&isNew=1&type=10&lang=zh_CN&token=';

const host = exports.host = 'mp.weixin.qq.com';

const token = exports.token = 798386145;