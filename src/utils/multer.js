import multer from 'multer'
import path from 'node:path'

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/')
	},

	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname))
	}
})


const ml = multer({ storage: storage })


export default ml