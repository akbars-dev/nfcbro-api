import { DataTypes, sequelize } from '../utils/database.js'

const AdminModel = sequelize.define('admins', {
	username: { type: DataTypes.STRING },
	password: { type: DataTypes.STRING },
})

export { AdminModel }

