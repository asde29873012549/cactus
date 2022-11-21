import * as dotenv from 'dotenv'
dotenv.config()
import {db, sequelize} from '../sequelize/models/index.cjs'
const chatroom = db.Chatroom
const messages = db.Messages
import {Op} from 'sequelize'
const user = db.User


const messageController = {
	getUserMessage : async (req, res) => {
		const {id} = req.params

		const queryString = `
			Chatrooms.id AS Chatroom_id,
			Chatrooms.createdAt,
			Chatrooms.sender_id,
			Chatrooms.receiver_id,
			Chatrooms.listing_id,
			Chatrooms.last_message,
			Chatrooms.last_message_sender_id AS lastSender,
			Users.id AS User_id,
			Users.username,
			Listings.id AS Listing_id,
			Listings.itemName,
			Listings.image_1
		`


		const [result, metaData] = await sequelize.query(
			`
			SELECT 
			${queryString} 
			FROM Chatrooms 
            LEFT JOIN Users ON Users.id = Chatrooms.sender_id 
			LEFT JOIN Listings ON Listings.id = Chatrooms.listing_id 
			WHERE Chatrooms.sender_id = '${id}'
            UNION
            SELECT 
			${queryString} 
			FROM Chatrooms 
            LEFT JOIN Users ON Users.id = Chatrooms.receiver_id 
			LEFT JOIN Listings ON Listings.id = Chatrooms.listing_id 
			WHERE Chatrooms.receiver_id = '${id}'
			`
			)


		res.json(result)
	},
	getAllMessages : async (req, res) => {
		const {id} = req.params
		const result = await messages.findAll({
			where:{
				chatroom_id:id
			}
		})
		res.json(result)
	},
	createMessage : async (req, res) => {
		const {inputValue, userId, chatroomId} = req.body
		const result = await messages.create({
			message:inputValue,
			user_id:userId,
			chatroom_id:chatroomId
		})
		res.json(result)
	},
	createChatroom : async (req, res) => {
		const {
			sender_id, 
			receiver_id, 
			listing_id, 
			last_message, 
			last_message_sender_id
		} = req.body
		const result = await chatroom.create({
			sender_id, 
			receiver_id, 
			listing_id, 
			last_message, 
			last_message_sender_id
		})
		res.json(result)
	},
	getChatroom : async (req, res) => {
		const {listing_id, user_id} = req.body
		const result = await chatroom.findOne({
			where:{
				listing_id,
				[Op.or]: [
					{ sender_id: user_id },
					{ receiver_id: user_id }
				  ]
			}
		})

		res.json(result)
	},
	updateLastMessage : async (req, res) => {
		const {user, message, chatroomId} = req.body
		const chat = await chatroom.findOne({
			where:{
				id:chatroomId
			}
		})
		if (chat) {
			chat.update({last_message:message,last_message_sender_id:user})
		}
		res.send('Updated')
	}
}

export default messageController