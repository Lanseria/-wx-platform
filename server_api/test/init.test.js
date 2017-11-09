var app = require('../lib/app')
var expect = require('chai').expect
var supertest = require('supertest')
var request = supertest(app)
var config = require('../lib/config')

describe('最初API转发接口测试', function () {
  it('/getWxPlatform搜索公众号信息', function (done) {
    request
      .get('/api/getWxPlatform')
      .query({
        action: 'search_biz',
        token: 798386145,
        lang: 'zh_CN',
        f: 'json',
        ajax: 1,
        random: 0.5222707753130587,
        query: '中大青年',
        begin: 0,
        count: 5
      }).expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        var ret = res.text
        var reg = /^\w+\(({[^]+})\)$/
        var matches = ret.match(reg)
        if (matches) {
          ret = JSON.parse(matches[1])
          expect(ret.base_resp.ret).to.equal(0)
          expect(ret.base_resp.err_msg).to.equal('ok')
        }
        done()
      })
  })
  it('/getgetWxNewsList接口测试', function (done) {
    request
      .get('/api/getWxNewsList')
      .query({
        token: config.token,
        lang: 'zh_CN',
        f: 'json',
        ajax: 1,
        random: 0.3452193238554264,
        action: 'list_ex',
        begin: 0,
        count: 5,
        query: '',
        fakeid: 'MjM5OTAxOTk4MA==',
        type: 9
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        var ret = res.text
        var reg = /^\w+\(({[^]+})\)$/
        var matches = ret.match(reg)
        if (matches) {
          ret = JSON.parse(matches[1])
          expect(ret.base_resp.ret).to.equal(0)
          expect(ret.base_resp.err_msg).to.equal('ok')
        }
        done()
      })
  })
})
