import AuthService from './auth-service.js'
import ButtonService from './button-service.js'
import PageService from './page-service.js'

const pageService = new PageService()
const buttonService = new ButtonService()
const authService = new AuthService()

class PageController {

	// auth
	async login(req, res, next) {
		try {
			const data = await authService.login(req.body.username, req.body.password)

			return res.json({ status: 201, message: 'Akkauntga kirdingiz', data: data })
		} catch (error) {
			next(error)
		}
	}

	// pages

	async allPages(req, res, next) {
		try {
			const data = await pageService.allPages()
			return res.json({ status: 200, message: "All pages: ", data: data })
		} catch (error) {
			next(error)
		}
	}


	async findPage(req, res, next) {
		try {
			const id = req.params.id
			const data = await pageService.findPage(id)

			return res.json({ status: 200, message: "Page: ", data: data })
		} catch (error) {
			next(error)
		}
	}

	async create(req, res, next) {
		try {
			const { name, about, username, password, watermark, buttons } = req.body
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
			const buttonsData = await buttonService.createButtons(data.id, JSON.parse(buttons))

			console.log(buttonsData)


			return res.json({ status: 201, message: "Page yaratildi", data: data })
		} catch (error) {
			next(error)
		}
	}


	async updatePage(req, res, next) {
		try {
			const id = req.params.id
			const body = req.body
			const { profilePic, backroundPic } = req.files



			const pgId = await pageService.update(id, body, profilePic, backroundPic)



			if (body.buttons) {
				for (const button of JSON.parse(body.buttons)) {

					const { id: buttonId, ...buttonData } = button
					console.log(id)

					await buttonService.updateButton(buttonId || 0, { pageId: pgId, ...buttonData })
				}
			}

			return res.json({ status: 200, message: "Page updated", data: [] })
		} catch (error) {
			next(error)
		}
	}

	async deletePage(req, res, next) {
		try {
			const id = req.params.id
			await pageService.delete(id)

			return res.json({ status: 200, message: "Page deleted", data: [] })
		} catch (error) {
			next(error)
		}
	}

	// buttons
	async addButtons(req, res, next) {
		try {
			const { buttons, pageId } = req.body

			const data = await buttonService.createButtons(pageId, buttons)

			return res.json({ status: 201, message: `Buttons added to page: ${pageId}`, data: data })
		} catch (error) {
			next(error)
		}
	}

	async updateButton(req, res, next) {
		try {
			const id = req.params.id
			const body = req.body

			await buttonService.updateButton(id, body)

			return res.json({ status: 200, message: `Button updated`, data: [] })
		} catch (error) {
			next(error)
		}
	}

	async deleteButton(req, res, next) {
		try {
			const id = req.params.id

			const data = await buttonService.deleteButton(id)

			return res.json({ status: 200, message: `Button deleted`, data: data })
		} catch (error) {
			next(error)
		}
	}

	async allButtons(req, res, next) {
		try {
			const allButtons = await buttonService.allButtons()
			return res.json({ status: 201, message: `All buttons`, data: allButtons })
		} catch (error) {
			next(error)
		}
	}

	async getButton(req, res, next) {
		try {
			const button = await buttonService.getButton(req.params.id)
			return res.json({ status: 200, message: `Get button by id`, data: button })
		} catch (error) {
			next(error)
		}
	}
}


export default new PageController()