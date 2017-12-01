import express from 'express'
import { signup, signin } from '../controllers/user'

const Routers = express.Router()

Routers.post('/', signup)
Routers.get('/', signin)

export default Routers
