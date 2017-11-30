import express from 'express'
import user from '../controllers/user'

const Routers = express.Router()

Routers.post('/', user.signup)
Routers.post('/authenticate', user.signin)

export default Routers
