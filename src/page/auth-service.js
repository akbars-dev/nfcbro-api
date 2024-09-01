import jwt from 'jsonwebtoken'
import ApiError from '../errors/api-error.js'
import { PageModel } from './page-models.js'


class AuthService {
	async login(username, password) {
		const condidation = await PageModel.findOne({ where: { username: username } })

		console.log(condidation)


		if (!condidation) throw ApiError.BadRequest("Username yoki parol xato")
		else if (condidation.password != password) throw ApiError.BadRequest("Username yoki parol xato")

		const token = jwt.sign({ username: condidation.username, password: condidation.password, id: condidation.id }, process.env.SECRET_KEY)

		return { token, page: condidation }
	}


}


export default AuthService