import { Router } from 'express'
import errorMiddleware from './middlewares/error-middleware.js'
import pageRouter from './page/page-router.js'


const router = Router()


router.use('/pages', pageRouter)
router.use(errorMiddleware)


export default router