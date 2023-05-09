import {db, sequelize} from '../sequelize/models/index.cjs'
import {Op} from 'sequelize'
const listing = db.Listing
const designers = db.Designers
const sizes = db.Sizes
const user = db.User
const departments = db.Departments
const conditions = db.Conditions
const categories = db.Categories
const likes = db.Likes
const favorites = db.FavoriteItems
const subCatgories = db.SubCategories
const staffPick = db.StaffPick
import {uploadFile} from '../s3.js'


 const listingController = {
	getAllListings : async (req, res) => {
		const {id} = req.params
		sizes.hasMany(listing)
		listing.belongsTo(sizes)
		listing.hasMany(favorites)
		favorites.belongsTo(listing)
		listing.hasOne(staffPick)
		staffPick.belongsTo(listing)


		const result = await listing.findAll({
			include:[{model:favorites, where:{
				user_id:id
			},
			required: false
		},{model:sizes},{model:staffPick}],
			order: [['id', 'DESC']]
		})
		res.json(result)
	},
	getAllDesigners : async (req, res) => {
		const result = await designers.findAll({
			order: [['name', 'ASC']]
		})
		res.json(result)
	},
	getAllDepartments : async (req, res) => {
		const result = await departments.findAll()
		res.json(result)
	},
	getAllSizes : async (req, res) => {
		const result = await sizes.findAll()
		res.json(result)
	},
	getAllConditions : async (req, res) => {
		const result = await conditions.findAll()
		res.json(result)
	},
	getAllCategories : async (req, res) => {
		const result = await categories.findAll()
		res.json(result)
	},
	getAllSubCategories : async (req, res) => {
		const result = await subCatgories.findAll()
		res.json(result)
	},
	filterListing : async (req, res) => {
		listing.hasOne(staffPick)
		staffPick.belongsTo(listing)

		const data = Object.entries(req.query).filter(filter => filter[1] !== '')
		let checkIsStaffPicked = false
		const result = data.map(data => {
			if (data[0] === 'size') {
				return ['SizeId', data[1]]
			} if (data[0] === 'StaffPick') {
				checkIsStaffPicked = true
				return ['id', {[Op.ne]:null}]
			} else {
				return [data[0]+'_id', data[1]]
			}
		})
		const whereClause = Object.fromEntries(result)
		const finalRes = await listing.findAll({
			where:whereClause,
			include:[{model:staffPick, required:checkIsStaffPicked}]
		})
		res.json(finalRes)
	},
	uploadListing : async (req, res) => {
		const files = req.files
		const {
			itemName,
			color,
			price,
			description,
			department_id,
			designer_id,
			category_id,
			condition_id,
			subCategory_id,
			user_id,
			SizeId
		} = req.body
		const imageArr = []
		async function uplaod() {
			for (let file of files) {
				const res = await uploadFile(file.buffer, file.mimetype)
				imageArr.push(res)
			}
			const result = await listing.create({
				itemName,
				color,
				price,
				description,
				department_id,
				designer_id,
				category_id,
				condition_id,
				subCategory_id,
				image_1:imageArr[0] || null,
				image_2:imageArr[1] || null,
				image_3:imageArr[2] || null,
				image_4:imageArr[3] || null,
				image_5:imageArr[4] || null,
				image_6:imageArr[5] || null,
				user_id,
				SizeId
			})
			res.json(result)
		}
		uplaod()
	},
	getSingleListing : async (req, res) => {
		const {id} = req.params

		const [result, metaData] = await sequelize.query(
			`
			SELECT 
			Listings.id,
			Listings.itemName,
			Listings.color,
			Listings.price,
			Listings.description,
			Listings.department_id,
			Listings.createdAt,
			Listings.updatedAt,
			Listings.category_id,
			Listings.subCategory_id,
			Listings.image_1,
			Listings.designer_id,
			Listings.condition_id,
			Listings.image_2,
			Listings.image_3,
			Listings.image_4,
			Listings.image_5,
			Listings.image_6,
			Listings.SizeId,
			Listings.user_id,
			Designers.id AS DesignerId,
			Designers.name AS designerName, 
			Categories.name AS categoryName, 
			Departments.name AS departmentName, 
			SubCategories.name AS subCategoryName, 
			Conditions.name AS conditionName,
			Sizes.name AS sizeName 
			FROM Listings LEFT JOIN Designers ON Listings.designer_id = Designers.id 
			LEFT JOIN Categories ON Listings.category_id = Categories.id 
			LEFT JOIN Departments ON Listings.department_id = Departments.id 
			LEFT JOIN SubCategories ON Listings.subCategory_id = SubCategories.id 
			LEFT JOIN Conditions  ON Listings.condition_id = Conditions.id 
			LEFT JOIN Sizes ON Listings.SizeId = Sizes.id 
			WHERE Listings.id = ${id}
			`
			)

		res.json(result)
	},
	likeAListing : async (req, res) => {
		const {ListingId, user_id} = req.body
		const findLikes = await likes.findOne({
			where:{
				ListingId
			}
		})

		const findFavorites = await favorites.findOne({
			where:{
				ListingId,
				user_id
			}
		})

		if (findLikes && findFavorites) {
			console.log('Decreaseee')
			await likes.decrement('likes', {
				by:1,
				where:{
					ListingId
				}
			})
			await favorites.destroy({
				where:{
					ListingId,
					user_id
				}
			})
		} else if (findLikes && !findFavorites) {
			console.log('Addd')
			await likes.increment('likes', {
				by:1,
				where:{
					ListingId
				}
			})
			await favorites.create({
				ListingId,
				user_id
			})
		} else {
			console.log('newly-created')
			await likes.create({
				likes:1,
				ListingId
			})
			await favorites.create({
				ListingId,
				user_id
			})
		}

		res.send('successful')
	},
	getTrendingItems : async (req, res) => {
		listing.hasOne(likes)
		likes.belongsTo(listing)
		sizes.hasOne(listing)
		listing.belongsTo(sizes)

		const result = await listing.findAll({
			include:[{model:likes, required:true}, {model:sizes}],
			order:[[likes, 'likes', 'DESC']],
			limit:5
		})
		res.json(result)
	}
}



export default listingController