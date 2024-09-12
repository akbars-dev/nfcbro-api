import ApiError from '../errors/api-error.js'
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
		const button = await ButtonModel.findOne({ where: { id: buttonId } })

		if (!button) {
			const newButton = await ButtonModel.create(data)
			return newButton
		}
		const updatedButton = await ButtonModel.update({ ...data, updateAt: Date.now() }, { where: { id: buttonId } })

		if (updatedButton[0] == 0) throw ApiError.BadRequest("Button not found")
		return updatedButton
	}

	async deleteButton(buttonId) {
		try {
			const buttonToDelete = await ButtonModel.findOne({ where: { id: buttonId } })

			if (!buttonToDelete) {
				throw ApiError.BadRequest("Button not found")
			}

			const deletedButton = await ButtonModel.destroy({ where: { id: buttonId }, force: true })

			if (deletedButton === 0) {
				throw ApiError.BadRequest("Failed to delete the button")
			}

			const remainingButtons = await ButtonModel.findAll({ where: { pageId: buttonToDelete.pageId } })

			return remainingButtons
		} catch (error) {
			throw error
		}
	}


	async allButtons() {
		const allButtons = await ButtonModel.findAll()
		return allButtons
	}

	async getButton(buttonId) {
		const getButton = await ButtonModel.findOne({ where: { id: buttonId } })
		if (!getButton) throw ApiError.BadRequest("Button not found")

		return getButton
	}

}

export default ButtonService