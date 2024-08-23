import { ButtonModel } from './page-models.js'

class ButtonService {
	async createButtons(pageId, buttons) {
		const data = []

		buttons.map(async button => {
			await data.push(await ButtonModel.create({ ...button, pageId: pageId }))
		})

		return data
	}

	async updateButton(buttonId, data) {
		const updatedButton = await ButtonModel.update({ ...data, updateAt: Date.now() }, { where: { id: buttonId } })
		return updatedButton
	}

	async deleteButton(buttonId) {
		const deletedButton = await ButtonModel.destroy({ where: { id: buttonId }, force: true })
		return deletedButton
	}

	async allButtons() {
		const allButtons = await ButtonModel.findAll()
		return allButtons
	}

	async getButton(buttonId) {
		const getButton = await ButtonModel.findOne({ where: { id: buttonId } })
		return getButton
	}

}

export default ButtonService