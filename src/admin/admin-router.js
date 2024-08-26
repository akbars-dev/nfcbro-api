import { Router } from 'express'
import adminController from './admin-controller.js'

const adminRouter = Router()


adminRouter.post('/create', adminController.create)
adminRouter.post('/login', adminController.login)


export default adminRouter