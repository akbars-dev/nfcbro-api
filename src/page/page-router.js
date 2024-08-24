import { Router } from 'express'
import pageController from './page-controller.js'

import ml from '../utils/multer.js'


const pageRouter = Router()

pageRouter.get('/all', pageController.allPages)
pageRouter.get('/get/:id', pageController.findPage)
pageRouter.post('/create', ml.fields([
	{ name: 'backroundPic', maxCount: 1 },
	{ name: 'profilePic', maxCount: 1 }
]), pageController.create)

pageRouter.put('/update/:id', ml.fields([
	{ name: 'backroundPic', maxCount: 1 },
	{ name: 'profilePic', maxCount: 1 }
]), pageController.updatePage)

pageRouter.delete('/delete/:id', pageController.deletePage)
// buttons
pageRouter.get('/all-buttons', pageController.allButtons)
pageRouter.get('/get-button/:id', pageController.getButton)
pageRouter.post('/add-buttons', pageController.addButtons)
pageRouter.put('/update-button/:id', pageController.updateButton)
pageRouter.delete('/delete-button/:id', pageController.deleteButton)

export default pageRouter