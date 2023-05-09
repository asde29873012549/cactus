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
	return jwt.sign(user, process.env.REACT_APP_ACCESS_TOKEN_SECRET, { expiresIn : '24h' })
}

const userController = {
	register : async (req, res) => {
		const {username, email, password} = req.body
		if (username && email && password) {

			const checkUserExist = await user.findOne({
				where:{
					username
				}
			})
			if (checkUserExist) {
				res.send('exist')
			} else {

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
				res.send('successful')
			}
		} else {
			res.send('Missing Info')
		}
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
						const refreshToken = jwt.sign({username}, process.env.REACT_APP_REFRESH_TOKEN_SECRET, { expiresIn : '168h' })

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

		jwt.verify(refreshToken, process.env.REACT_APP_REFRESH_TOKEN_SECRET, (err, user) => {
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
			process.env.REACT_APP_CLIENT_ID,
			process.env.REACT_APP_CLIENT_SECRET,
			'https://cactus-luxury.com/api/Oauth2/google'
		)
		const scopes = [
			'https://www.googleapis.com/auth/userinfo.email',
			'https://www.googleapis.com/auth/userinfo.profile'
		]

		console.log(oauth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: scopes
		  }))

		const url = oauth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: scopes
		  })
		
		//res.writeHead(301, { "Location": url })
		//res.end()
		res.send(url)
	},
	getAuthorizationCode : async (req, res) => {

		const oauth2Client = new google.auth.OAuth2(
			process.env.REACT_APP_CLIENT_ID,
			process.env.REACT_APP_CLIENT_SECRET,
			'https://cactus-luxury.com/api/Oauth2/google'
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
			console.log('createNewAccounmt')
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
					const refreshToken = jwt.sign({username}, process.env.REACT_APP_REFRESH_TOKEN_SECRET, { expiresIn : '72h' })
					
					res.cookie('isAuth',accessToken,{ httpOnly: false })
					res.cookie('token',refreshToken,{ httpOnly: false })
					res.cookie('username',result.username,{ httpOnly: false })
					res.cookie('userId',result.id,{ httpOnly: false })

					res.redirect('https://cactus-luxury.com')
				} 
			})
		} else {

			const username = decodeToken.name
			const accessToken = generateAccessToken({username})
			const refreshToken = jwt.sign({username}, process.env.REACT_APP_REFRESH_TOKEN_SECRET, { expiresIn : '72h' })

			res.cookie('isAuth',accessToken,{ httpOnly: false })
			res.cookie('token',refreshToken,{ httpOnly: false })
			res.cookie('username',result.username,{ httpOnly: false })
			res.cookie('userId',result.id,{ httpOnly: false })

			res.redirect('https://cactus-luxury.com')
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