import * as dotenv from 'dotenv'
dotenv.config()
import {Server} from 'socket.io'
import express from 'express'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import multer  from 'multer'
const storage = multer.memoryStorage()
const upload = multer({ storage })
import ecpay_payment from './node_modules/ecpay_aio_nodejs/lib/ecpay_payment.js'
import {options} from './ec_payment_Config.js'

import {users, addUser, removeUser, getUser} from './socket.js'
const app = express()
const port = 5001

import listingController from './controllers/listing.js'
import userController from './controllers/user.js'
import messageController from './controllers/message.js'
import designerController from './controllers/designer.js'


const authenticateUser = (req, res, next) => {
	const authHeader = req.headers.authorization
	if (!authHeader) return res.sendStatus(401)

	const token = authHeader.split(' ')[1]
	if (!token) {
		res.sendStatus(401)
	} else {
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
			if (err) return res.sendStatus(403)
			req.user = user
			next()
		})
	}
}

app.use(bodyParser.urlencoded({ extended:false}))
app.use(bodyParser.json())
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization')
	res.setHeader('Access-Control-Allow-Methods', '*')
	res.setHeader('Access-Control-Allow-Credentials', true)
	next()
})

app.get('/', (req,res) => {
	res.send('hi')
})

app.get('/departments', listingController.getAllDepartments)
app.get('/designers', listingController.getAllDesigners)
app.get('/shop/:id', listingController.getAllListings)
app.get('/size', listingController.getAllSizes)
app.get('/condition', listingController.getAllConditions)
app.get('/categories', listingController.getAllCategories)
app.get('/subCategories', listingController.getAllSubCategories)

app.get('/filter', listingController.filterListing)

app.post('/sell/uploadListing', upload.array('images', 6), listingController.uploadListing)

app.get('/shop/listing/:id', listingController.getSingleListing)

app.post('/register', userController.register)
app.post('/login', userController.login)
app.post('/token', userController.generateAccessToken)
app.get('/getMe', authenticateUser, userController.getMe)

app.get('/authGoogle', userController.generateConsentPageUrl)
app.get('/Oauth2/google', userController.getAuthorizationCode)


app.get('/getUserChatroom/:id', messageController.getUserMessage)
app.get('/getAllMessages/:id', messageController.getAllMessages)
app.post('/createMessage', messageController.createMessage)
app.post('/createChatroom', messageController.createChatroom)
app.post('/getChatroom', messageController.getChatroom)
app.post('/updateLastMessage', messageController.updateLastMessage)

app.get('/getUserProfile/:id', userController.getUserProfile)
app.get('/getUserItems/:id', userController.getUserItems)
app.post('/updateProfile/:id', userController.updateProfile)
app.post('/changeUserAvatar/:id', upload.single('images'), userController.changeUserAvatar)

app.post('/likeAListing', listingController.likeAListing)

app.get('/getSingleDesigner/:id', designerController.getSingleDesigner)

app.post('/addToCart/:id', userController.addToUserCart)
app.post('/removeFromCart/:id', userController.removeFromUserCart)
app.get('/getUserShoppingCart/:id', userController.getUserShoppingCart)

app.get('/getTrendingItems', listingController.getTrendingItems)

app.post('/paymentResult', async (req, res) => {

	const {
		ItemName,
		MerchantTradeDate,
		MerchantTradeNo,
		TotalAmount,
		TradeDesc} = req.body

	console.log(TotalAmount)

	const create = new ecpay_payment(options)
  	const html = create.payment_client.aio_check_out_all({
		ItemName,
		MerchantID:'3002607',
		MerchantTradeDate,
		MerchantTradeNo,
		ReturnURL:'https://cactus-luxury.com',
		TotalAmount,
		TradeDesc}, {})
		res.send(html)

	
}) 



const server = app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`)
})

const io = new Server(server, { cors: { origin: 'https://cactus-luxury.com' } })

io.on('connection', socket => {
	console.log(`This is connected to ${socket.id}`)

	socket.on('addUser', userId => {
		addUser(userId, socket.id)

		io.emit('getUsers', users)
	})

	socket.on('sendMessage', ({senderId, receiverId, text}) => {
		const user = getUser(receiverId)
		io.emit('getMessage', {
			senderId,
			text
		})
	})

	socket.on('disconnect', () => {
		console.log('User disconnected', socket.id)
		removeUser(socket.id)
		io.emit('getUsers', users)
	})
})