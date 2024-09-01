import { Router } from 'express'
import jwt from 'jsonwebtoken'

const checkRouter = Router()

checkRouter.post('/token', (req, res, next) => {
	try {
		const token = req.body.token


		jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
			if (err) {
				return res.json({ status: 403, message: "Invalid token", data: { isAuth: false } })
			}

			return res.json({ status: 200, message: "Token is valid", data: { token: decoded, isAuth: true } })
		})

	} catch (error) {
		next(error)
	}
})

export default checkRouter
