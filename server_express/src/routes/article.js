import express from 'express'
import { getNormalArticles } from '../controllers/article'

const Routers = express.Router()

Routers.get('/', getNormalArticles)

export default Routers
