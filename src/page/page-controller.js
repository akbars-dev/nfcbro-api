import PageService from './page-service.js'


const pageService = new PageService()

class PageController {
	async create(req, res, next) {
		try {
			const { name, about, username, password, watermark } = req.body
			const { profilePic, backroundPic } = req.files

			const body = {
				name,
				about,
				username,
				password,
				watermark,
				profilePic: profilePic[0].filename,
				backroundPic: backroundPic[0].filename
			}

			const data = await pageService.create(body)

			return res.json({ status: 201, message: "Page yaratildi", data: data })
		} catch (error) {
			next(error)
		}
	}
}


export default new PageController()