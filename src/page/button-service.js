import { ButtonModel } from './page-models.js'

class ButtonService {
	async createButtons(pageId, buttons) {
		const data = []

		buttons.map(async button => {
			await data.push(await ButtonModel.create({ ...button, pageId: pageId }))
		})

		return data
	}
}

export default ButtonService