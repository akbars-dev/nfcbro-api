import multer from 'multer'
import path from 'node:path'
import { v4 } from 'uuid'

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/')
	},

	filename: async function (req, file, cb) {
		cb(null, await v4() + path.extname(file.originalname))
	}
})


const ml = multer({
	storage: storage, limits: {
		fileSize: 50 * 1024 * 1024,
	},
})


export default ml