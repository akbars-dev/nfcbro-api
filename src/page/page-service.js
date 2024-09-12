import fs from 'fs'

import ApiError from '../errors/api-error.js'
import { ButtonModel, PageModel } from './page-models.js'

class PageService {

	async allPages() {
		const pages = await PageModel.findAll()
		return pages
	}

	async findPage(id) {
		const page = await PageModel.findOne({
			where: { username: id },
			include: [
				{
					model: ButtonModel,
					as: 'buttons'
				}
			]
		})

		if (!page) throw ApiError.BadRequest("Bunday sahifa mavjud emas :(")

		return page
	}

	async create(data) {
		const condidate = await PageModel.findOne({ where: { username: data.username } })

		if (condidate) throw ApiError.BadRequest('Bunday page oldin yaratilgan. Boshqa username kiriting')

		const page = await PageModel.create({
			name: data.name,
			about: data.about,
			profilePic: data.profilePic,
			backroundPic: data.backroundPic,
			username: data.username,
			password: data.password,
			watermark: data.watermark
		})

		return page
	}


	async update(id, data, profilePic, backroundPic) {
		const page = await PageModel.findOne({ where: { username: id } })

		if (!page) throw ApiError.BadRequest("Page not found")

		if (profilePic && backroundPic) {
			await fs.unlink(`./public/${page.profilePic}`, (err) => err ? console.log(err) : null)
			await fs.unlink(`./public/${page.backroundPic}`, (err) => err ? console.log(err) : null)

			await PageModel.update({ ...data, profilePic: profilePic[0].filename, backroundPic: backroundPic[0].filename }, { where: { username: id } })
		} else if (profilePic) {
			await fs.unlink(`./public/${page.profilePic}`, (err) => err ? console.log(err) : null)

			await PageModel.update({ ...data, profilePic: profilePic[0].filename }, { where: { username: id } })
		} else if (backroundPic) {
			await fs.unlink(`./public/${page.backroundPic}`, (err) => err ? console.log(err) : null)

			await PageModel.update({ ...data, backroundPic: backroundPic[0].filename }, { where: { username: id } })
		} else {
			await PageModel.update({ ...data }, { where: { username: id } })
		}

		const updatedPage = await PageModel.findOne({ where: { username: id } })
		return updatedPage.id
	}



	async delete(id) {
		console.log(id)

		const condidate = await PageModel.findOne({ where: { id: id } })

		if (!condidate) throw ApiError.BadRequest("Page not found")

		await fs.unlink(`./public/${condidate.backroundPic}`, (err) => err ? console.log(err) : null)
		await fs.unlink(`./public/${condidate.backroundPic}`, (err) => err ? console.log(err) : null)

		const deletedPage = await PageModel.destroy({ where: { id: id } })
		await ButtonModel.destroy({ where: { pageId: id } })

		return deletedPage
	}

}


export default PageService