import express, { Router } from 'express'

const Routers = express.Router()

Routers.post('/', user.signup)
Routers.post('/authenticate', user.signin)

export default Routers
