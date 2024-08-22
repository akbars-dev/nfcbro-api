import { Router } from 'express'
import pageRouter from './page/page-router.js'


const router = Router()


router.use('/pages', pageRouter)



export default router