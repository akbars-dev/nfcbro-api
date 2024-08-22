import express from 'express'
import { connectDB } from './src/database.js'
import router from './src/index.js'


const app = express()


async function main() {
	app.use(express.json())

	app.use('/api', router)


	app.listen(4200, async () => {
		console.log(`> Server is running on port: ${4200}`)
		await connectDB()
		sequelize.sync({ force: false }).then(() => {
			console.log("✅Synced database successfully...")
		})
	})
}


main()