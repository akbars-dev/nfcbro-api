import { Router } from 'express'
import pageController from './page-controller.js'

import ml from '../utils/multer.js'


const pageRouter = Router()


pageRouter.post('/create', ml.fields([
	{ name: 'backroundPic', maxCount: 1 },
	{ name: 'profilePic', maxCount: 1 }
]), pageController.create)


export default pageRouter