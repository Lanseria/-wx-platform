var axios = require('axios')
var express = require('express')

var port = 3090

var app = express()
var apiRouters = express.Router()

apiRouters.get('/getWxNewsList', function (req, res) {
  var url = 'https://mp.weixin.qq.com/cgi-bin/appmsg'
  axios.get(url, {
    headers: {
      referer: 'https://mp.weixin.qq.com/cgi-bin/appmsg?t=media/appmsg_edit_v2&action=edit&isNew=1&type=10&lang=zh_CN&token=860762349',
      host: 'mp.weixin.qq.com',
      cookie: returnCooke()
    },
    params: req.query
  }).then((response) => {
    req.query.jsonpCallback = req.query.jsonpCallback || 'wxJsonpCallback'
    res.send( req.query.jsonpCallback + '(' + JSON.stringify(response.data) + ')')
  }).catch(e => {
    console.log(e)
  })
})
function returnCooke() {
    return `noticeLoginFlag=1; remember_acct=564265135%40qq.com; pgv_pvi=4049149952; RK=YLvaa0CLZG; sd_userid=67101502462588486; sd_cookie_crttime=1502462588486; eas_sid=s1z5L084Z1j7S5K0q2N5r6A3W7; tvfe_boss_uuid=c81d8c4ad1ab7f0b; LW_uid=V1o5U0j4e8c8G0Q7M46222T184; ts_uid=4933691476; ue_uid=12a60f7dcf0501f019442f927293693e; ue_ts=1506772377; ue_uk=e4d9ed20d6bd4ae7e9aea6ef70b01e56; ue_skey=60f01fc957a8ddf07021731f5db29b47; LW_pid=c94bab9da43a9550212358883ca7ab70; o_cookie=564265135; LW_sid=Z1H5U0f8p5S8F4P5P1k5D5D6n1; pgv_pvid=2841296472; pgv_pvid_new=564265135_47d12890df; uuid=09a1ea0c96ed39460348655fffa8d280; ticket=9687d6bdce1abf7ab97bb5871a7bc7e1ee3db6ab; ticket_id=gh_fdec0ce935dd; cert=nAOHyPh_oyYgIEVhG4frEaEIcD6Efycw; data_bizuin=3019185208; data_ticket=UTzb0Z5HrGhRCLh6Tz9VD71QeKuElyr/6b92mXOTzMAvqxV+pynRYlpWzGw4909l; ua_id=OhlJsOysIxA9BSfsAAAAALsVlE8xH6BDUAbHWebv9DU=; xid=44d808462dd2f550edf8a8b86da43129; openid2ticket_oOBz1s_TauyZir4KhMJa3Zxeu6Oc=KMU8sfG1on/nU2BmYA0KfHQQI3AK9xXQJFwDryf8Bcg=; pgv_si=s7767157760; _qpsvr_localtk=0.019915293342039675; ptisp=cnc; ptcz=9576a45243d13aa708059c2263c54aeaa517836a0427262656bfeefac106b570; uin=o0564265135; skey=@DR2LyBoBP; pt2gguin=o0564265135; slave_user=gh_fdec0ce935dd; slave_sid=dWhsM0x5aXJYYmdmWTByN0kwWjBzUXNQZG80UEc1UGg5SGxYdm9BTGtiN2duclBWNjV0VElJWUJKeWpVQmN1WUo2ZGdsV1I5dTdBWGVKSDIxMkxrVG5rZVVzbXJlcjRLNDduOUFQaXZ3cWlWRFpPUEI4cVBuQU4yaWw1U1dGdjUwVDdpUWJuYmNNWlJlQWJO; bizuin=3004531630`;
}

app.use('/api', apiRouters)
app.listen(port)
