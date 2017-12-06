import express from 'express'
import * as cgiBin from '../controllers/cgiBin'
import { getNormalArticles } from '../controllers/article'
import { signup, signin } from '../controllers/user'

let apiRouters = express.Router()

// cgi-bin
apiRouters.use('/cgi-bin/:n', cgiBin.judgeProxyName)
apiRouters.get('/cgi-bin/searchbiz', cgiBin.searchbiz)
apiRouters.get('/cgi-bin/appmsg', cgiBin.appmsg)
apiRouters.use('/cgi-bin/:n', cgiBin.processProxy)

// user
apiRouters.post('/user', signup)
apiRouters.get('/user', signin)

apiRouters.get('/article', getNormalArticles)

export default apiRouters
