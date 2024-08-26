import AdminService from './admin-service.js'

const adminService = new AdminService()

class AdminController {
	async create(req, res, next) {
		try {
			const { username, password } = req.body

			const admin = await adminService.create(username, password)

			return res.json({ status: 201, message: "Admin created", data: [admin] })
		} catch (error) {
			next(error)
		}
	}

	async login(req, res, next) {
		try {
			const { username, password } = req.body


			const token = await adminService.login(username, password)

			return res.json({ status: 200, message: "Logined", data: token })
		} catch (error) {
			next(error)
		}
	}
}


export default new AdminController()