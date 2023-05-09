import * as dotenv from 'dotenv'
dotenv.config()
import {db} from '../sequelize/models/index.cjs'
const designers = db.Designers



const designerController = {
	getSingleDesigner : async (req, res) => {
		const {id} = req.params

		const result = await designers.findOne({
			where:{
				id
			}
		})
		if (result) {
			res.json(result)
		} else {
			res.send('Something went wrong')
		}
	}
}

export default designerController