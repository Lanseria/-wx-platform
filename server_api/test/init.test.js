var app = require('../app')
var expect = require('chai').expect
var supertest = require('supertest')
var request = supertest(app)

describe('最初API转发接口测试', function () {
  it('/getgetWxNewsList接口测试', function (done) {
    request
      .get('/api/getWxNewsList')
      .query({
        token: 1214495473,
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
