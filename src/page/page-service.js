import fs from 'fs'

import ApiError from '../errors/api-error.js'
import { PageModel } from './page-models.js'

class PageService {

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
		const page = await PageModel.findOne({ where: { id: id } })

		if (!page) throw ApiError.BadRequest("Page not found")

		if (profilePic && backroundPic) {
			await fs.unlink(`./public/${page.profilePic}`, (err) => err ? console.log(err) : null)
			await fs.unlink(`./public/${page.backroundPic}`, (err) => err ? console.log(err) : null)

			const updatedPage = await PageModel.update({ ...data, profilePic: profilePic[0].filename, backroundPic: backroundPic[0].filename }, { where: { id: id } })
			return updatedPage
		} else if (profilePic) {
			await fs.unlink(`./public/${page.profilePic}`, (err) => err ? console.log(err) : null)

			const updatedPage = await PageModel.update({ ...data, profilePic: profilePic[0].filename }, { where: { id: id } })
			return updatedPage
		} else if (backroundPic) {
			await fs.unlink(`./public/${page.backroundPic}`, (err) => err ? console.log(err) : null)

			const updatedPage = await PageModel.update({ ...data, backroundPic: backroundPic[0].filename }, { where: { id: id } })
			return updatedPage
		}
	}

}


export default PageService