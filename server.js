import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import router from './src/index.js'
import { connectDB, sequelize } from './src/utils/database.js'


const app = express()
dotenv.config()

async function main() {
	app.use(express.static('./public'))

	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))

	app.use(cors({ origin: "*" }))
	app.use('/api', router)


	app.listen(process.env.PORT, async () => {
		console.log(`> Server is running on port: ${process.env.PORT}`)
		await connectDB()
		sequelize.sync({ force: false }).then(() => {
			console.log("✅Synced database successfully...")
		})
	})
}


main()