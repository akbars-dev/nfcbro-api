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

}


export default PageService