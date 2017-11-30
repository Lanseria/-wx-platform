import express from 'express'
import * as cgiBin from '../controllers/cgiBin'

let apiRouters = express.Router()

// proxy
apiRouters.use('/cgi-bin/:n', cgiBin.judgeProxyName)
apiRouters.get('/cgi-bin/searchbiz', cgiBin.searchbiz)
apiRouters.get('/cgi-bin/appmsg', cgiBin.appmsg)
apiRouters.use('/cgi-bin/:n', cgiBin.processProxy)

export default apiRouters
