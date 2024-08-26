import jwt from 'jsonwebtoken'
import { AdminModel } from './admin-model.js'

class AdminService {
	async create(username, password) {
		const admin = await AdminModel.create({ username, password })

		return admin
	}

	async login(username, password) {
		const condidation = await AdminModel.findOne({ where: { username: username } })

		if (!condidation) throw ApiError.BadRequest("Username yoki parol xato")
		else if (condidation.password != password) throw ApiError.BadRequest("Username yoki parol xato")

		const admin = JSON.parse(JSON.stringify(condidation.dataValues))


		delete condidation.password


		const token = jwt.sign({ admin }, process.env.SECRET_KEY)

		return token
	}
}


export default AdminService