import * as dotenv from 'dotenv'
dotenv.config()
import {db, sequelize} from '../sequelize/models/index.cjs'
const user = db.User
const listing = db.Listing
const likes = db.Likes
const sizes = db.Sizes
const shoppingCart = db.ShoppingCart
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import jwt_decode from 'jwt-decode'
const saltRounds = 10
import {google} from 'googleapis'
import {uploadFile} from '../s3.js'

const generateAccessToken = (user) => {
	return jwt.sign(user, '3e012d31b3759bfc240d0ea9be87ccaeb72f2ab69289f42f1904e2c264b5fc8c141ec5f5a777a28f695a7c760b9b98470cddbe21dafbeb7789cdf393e5106831', { expiresIn : '24h' })
}

const userController = {
	register : async (req, res) => {
		const {username, email, password} = req.body
		if (username && email && password) {
			bcrypt.hash(password, saltRounds, async (err, hash) => {
				if (err) {
					console.log(err)
				} else {
					const result = await user.create({
						username,
						email,
						password:hash
					})
				} 
			})
		} else {
			res.send('Missing Info')
		}
		res.send('successful')
	},
	login : async (req, res) => {
		const {username, password} = req.body
		if (username && password) {
			const result = await user.findOne({
				where:{
					username
				}
			})
			if (result) {
				bcrypt.compare(password, result.password, (err, isSuccess) => {
					if (err || !isSuccess) {
						res.sendStatus(403)
					} else {
						const accessToken = generateAccessToken({username})
						const refreshToken = jwt.sign({username}, 'f4e92e5d0ee2bb8b419a4f58cf795f1dd5486e7e0f3f236e323e57629a5e1f48b8df60ea9d0159bb25b277438a80906c9a2e27323790e9314eabdedbb9ac3fda', { expiresIn : '168h' })

						res.json({
							isAuth:accessToken,
							token:refreshToken,
							userId:result.id,
							username:result.username
						})
					}
				})
			} else {
				res.sendStatus(401)
			}
		} else {
			res.sendStatus(401)
		}
	},
	generateAccessToken : (req, res) => {
		const {refreshToken} = req.body
		if (!refreshToken) return res.sendStatus(401)

		jwt.verify(refreshToken, 'f4e92e5d0ee2bb8b419a4f58cf795f1dd5486e7e0f3f236e323e57629a5e1f48b8df60ea9d0159bb25b277438a80906c9a2e27323790e9314eabdedbb9ac3fda', (err, user) => {
			if (err) return res.sendStatus(403)
			const accessToken = generateAccessToken({username:user.username})
			res.json({username:user.username,accessToken})
		})
	},
	getMe : (req, res) => {
		const {user} = req
		res.send(user)
	},
	generateConsentPageUrl : (req, res) => {
		const oauth2Client = new google.auth.OAuth2(
			'567926913321-oofmqdtjvc13bvnlsviubhdrpkuma4vm.apps.googleusercontent.com',
			'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',
			'http://localhost:5001/Oauth2/google'
		)
		const scopes = [
			'https://www.googleapis.com/auth/userinfo.email',
			'https://www.googleapis.com/auth/userinfo.profile'
		]

		const url = oauth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: scopes
		  })
		
		res.writeHead(301, { "Location": url })
		res.end()
		//res.send(url)
	},
	getAuthorizationCode : async (req, res) => {

		const oauth2Client = new google.auth.OAuth2(
			'567926913321-oofmqdtjvc13bvnlsviubhdrpkuma4vm.apps.googleusercontent.com',
			'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',
			'http://localhost:5001/Oauth2/google'
		)
		const {code} = req.query
		const {tokens} = await oauth2Client.getToken(code)
		oauth2Client.setCredentials(tokens)

		const decodeToken = jwt_decode(tokens.id_token)
		
		const result = await user.findOne({
			where:{
				username:decodeToken.name
			}
		})

		if (!result) {
			bcrypt.hash(decodeToken.email, saltRounds, async (err, hash) => {
				if (err) {
					console.log(err)
				} else {
					const result = await user.create({
						username:decodeToken.name,
						email:decodeToken.email,
						password:hash
					})

					const username = decodeToken.name
					const accessToken = generateAccessToken({username})
					const refreshToken = jwt.sign({username}, 'f4e92e5d0ee2bb8b419a4f58cf795f1dd5486e7e0f3f236e323e57629a5e1f48b8df60ea9d0159bb25b277438a80906c9a2e27323790e9314eabdedbb9ac3fda', { expiresIn : '72h' })

					res.cookie('UserInfo',{
						isAuth:accessToken,
						token:refreshToken,
						username,
					}, { httpOnly: false })
				} 
			})
			res.redirect('http://localhost:3000')
		} else {

			const username = decodeToken.name
			const accessToken = generateAccessToken({username})
			const refreshToken = jwt.sign({username}, 'f4e92e5d0ee2bb8b419a4f58cf795f1dd5486e7e0f3f236e323e57629a5e1f48b8df60ea9d0159bb25b277438a80906c9a2e27323790e9314eabdedbb9ac3fda', { expiresIn : '72h' })

			res.cookie('isAuth',accessToken,{ httpOnly: false })
			res.cookie('token',refreshToken,{ httpOnly: false })
			res.cookie('username',result.username,{ httpOnly: false })
			res.cookie('userId',result.id,{ httpOnly: false })

			res.redirect('http://localhost:3000')
		}
	},
	getUserProfile : async (req, res) => {
		const {id} = req.params
		const result = await user.findOne({
			where:{
				id
			}
		})
		if (result) {
			res.json(result)
		} else {
			res.send('Please Login or Register')
		}
	},
	getUserItems : async (req, res) => {
		sizes.hasMany(listing)
		listing.belongsTo(sizes)
		listing.hasOne(likes)
		likes.belongsTo(listing)

		const {id} = req.params
		const result = await listing.findAll({
			where:{
				user_id:id
			},
			include:[{model:likes}, {model:sizes}],
			order: [['id', 'DESC']]
		})
		if (result) {
			res.json(result)
		} else {
			res.send('Currently Not Available')
		}
	},
	updateProfile : async (req, res) => {
		const {id} = req.params
		const {username, email, bio, address, city, nation} = req.body
		const userInfo = await user.findOne({
			where:{
				id
			}
		})
		if (userInfo && !address && !city && !nation) {
			userInfo.update({
				username,
				email,
				bio
			})
		} else if (userInfo && !username && !email && !bio) {
			userInfo.update({
				address,
				city,
				nation
			})
		}
		res.send('update successful')
	},
	addToUserCart : async (req, res) => {
		const {id} = req.params
		const userId = req.body.id
		await shoppingCart.create({
			UserId:userId,
			ListingId:id
		})
	},
	removeFromUserCart : async (req, res) => {
		const {id} = req.params
		const userId = req.body.id
		const shoppingCartListing = await shoppingCart.findOne({
			where:{
				UserId:userId,
				ListingId:id
			}
		})
		if (shoppingCartListing) {
			await shoppingCartListing.destroy()
		}
		res.send('delete Successfully')
	},
	getUserShoppingCart : async (req, res) => {
		listing.hasMany(shoppingCart)
		shoppingCart.belongsTo(listing)

		const {id} = req.params
		const [result, metaData] = await sequelize.query(
			`
			SELECT *,
			Sizes.name AS sizeName,
			Users.username AS sellerName 
			FROM ShoppingCarts 
			LEFT JOIN Listings ON Listings.id = ShoppingCarts.ListingId 
			LEFT JOIN Sizes ON Listings.SizeId = Sizes.id 
			LEFT JOIN Users ON Listings.user_id = Users.id 
			WHERE ShoppingCarts.UserId = ${id}
			`
			)
		res.json(result)
	},
	changeUserAvatar : async (req, res) => {
		const file = req.file
		const {id} = req.params
		async function uplaod() {
			const userProfile = await user.findOne({
				where:{
					id,
				}
			})

			if (userProfile) {
				const res = await uploadFile(file.buffer, file.mimetype)

				const result = await userProfile.update({
					avatar:res
				})
			}
		}
		uplaod()
		res.send('ok')
	}
}

export default userController