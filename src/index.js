import { Router } from 'express'
import adminRouter from './admin/admin-router.js'
import errorMiddleware from './middlewares/error-middleware.js'
import pageRouter from './page/page-router.js'


const router = Router()


router.use('/pages', pageRouter)
router.use('/admin', adminRouter)
router.use(errorMiddleware)


export default router