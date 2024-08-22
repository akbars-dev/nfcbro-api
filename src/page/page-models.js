import { DataTypes, sequelize } from '../utils/database.js'

/**TODO: 
 * PAGES MODEL
 * name: string
 * about: text
 * profilePic: string
 * backroundPic: string
 * watermark: boolean
 * username: string
 * password: string
 
 * BUTTONS MODEL
 * label
 * url
 * type
 * bg-color
 * text-color
 * animation

*/


const PageModel = sequelize.define("pages", {
	id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
	name: { type: DataTypes.STRING(100), allowNull: false },
	about: { type: DataTypes.TEXT, allowNull: false },
	profilePic: { type: DataTypes.STRING, allowNull: false },
	backroundPic: { type: DataTypes.STRING, allowNull: false },
	username: { type: DataTypes.STRING, allowNull: false },
	password: { type: DataTypes.STRING, allowNull: false },
	watermark: { type: DataTypes.BOOLEAN, allowNull: false },
})


const ButtonModel = sequelize.define('buttons', {
	id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
	label: { type: DataTypes.STRING(50), allowNull: false },
	url: { type: DataTypes.STRING, allowNull: false },
	type: { type: DataTypes.STRING(20), allowNull: false },
	bgColor: { type: DataTypes.STRING(80), allowNull: false },
	textColor: { type: DataTypes.STRING(80), allowNull: false },
	animation: { type: DataTypes.STRING(80), allowNull: false },
})

PageModel.hasMany(ButtonModel, { as: 'buttons' })
ButtonModel.belongsTo(PageModel, { foreignKey: 'pageId', as: 'pages' })

export { ButtonModel, PageModel }

