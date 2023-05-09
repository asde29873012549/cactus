import React, { useEffect, useState, useRef } from 'react'
import io from 'socket.io-client'
import styled from 'styled-components'
import {parseISO, differenceInMinutes} from 'date-fns'
import {Message} from './Message'
import {getAllMessages, sendMessage, getAllEmoji, updateLastMessage} from '../WebAPI'
import emojiIcon from './static/emojiIcon.png'
import gifIcon from './static/gif.png'
import { Carousel } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'
import {MEDIA_QUERY_SM, MEDIA_QUERY_MD} from '../breakpoints'
const socket = io('wss://cactus-luxury.com', {
	transports: ["websocket", "polling"]
})


const ChatroomWrapper = styled.div `
margin:0 auto;
width:100%;
display:flex;
flex-direction:column;
border:1px solid rgb(220, 220, 220);

`

const ChatroomTitle = styled.div `
border-bottom:1px solid rgb(220, 220, 220);
display:flex;
align-items:center;
font-size:0.9rem;
padding:0 20px;
height:100px;
`

const ChatroomBody = styled.div `
height:500px;
padding:20px 10px;
box-sizing:border-box;
display:flex;
flex-direction:column;
overflow:scroll;
::-webkit-scrollbar {
    display: none;
}
`

const ItemImage = styled.div `
background-image:url(${props => props.image ? props.image : null});
background-size:contain;
background-repeat:no-repeat;
background-position:center;
width:80px;
height:80px;
margin-right:20px;
border-radius:50%;
border:1px solid transparent;
`

const Left = styled.div `
width:30%;
display:flex;
align-items:center;
`

const ItemName = styled.div `
font-weight:800;
${MEDIA_QUERY_MD} {
	font-size:0.8rem;
}
${MEDIA_QUERY_SM} {
	font-size:0.8rem;
}
`

const ChatroomInputWrapper = styled.div `
height:50px;
text-align:center;
box-sizing:border-box;
position:relative;
display: flex;
align-items: center;

`

const ChatroomInput = styled.input `
border:1px solid rgb(220, 220, 220);
border-radius:20px;
color:grey;
padding:5px 15px;
font-size:0.9rem;
margin:0 auto;
width:95%;
height:30px;
`

const Time = styled.div `
color:#828282;
font-size:0.7rem;
margin:0 auto;
width:200px;
text-align:center;
${MEDIA_QUERY_MD} {
	font-size:0.6rem;
}
${MEDIA_QUERY_SM} {
	font-size:0.6rem;
}
`

const EmojiIcon = styled.div `
background-image:url(${emojiIcon});
width:27px;
height:27px;
margin-left:94%;
background-size:cover;
background-repeat:no-repeat;
position:absolute;
&:hover {
	cursor:pointer;
}
${MEDIA_QUERY_MD} {
	margin-left:72vw;
}
${MEDIA_QUERY_SM} {
	margin-left:72vw;
}
`

const GifIcon = styled.div `
background-image:url(${gifIcon});
width:40px;
height:40px;
margin-left:90%;
background-size:cover;
background-repeat:no-repeat;
position:absolute;
&:hover {
	cursor:pointer;
}
${MEDIA_QUERY_MD} {
	margin-left:88%;
${MEDIA_QUERY_SM} {
	margin-left:88%;
}
`

const EmojiSection = styled.div `
height:150px;
background-color:white;
position:absolute;
width:1065px;
margin-top:450px;
box-sizing:border-box;
::-webkit-scrollbar {
    display: none;
}
${MEDIA_QUERY_MD} {
	width:90vw;
${MEDIA_QUERY_SM} {
	width:90vw;
}
`

const GifSection = styled.div `
padding:10px;
position:absolute;
margin-top:330px;
width:1065px;
box-sizing:border-box;
background-color:white;
${MEDIA_QUERY_MD} {
	width:90vw;
${MEDIA_QUERY_SM} {
	width:90vw;
}
`

const Emojis = styled.div `
height:110px;
overflow:scroll;
`

const SingleEmoji = styled.div `
width:20px;
height:20px;
margin:5px;
display:inline-block;
&:hover {
	cursor:pointer;
}
`

const EmojiSearch = styled.input `
background-color:rgb(240, 240, 240);
border-radius:20px;
border:0;
width:260px;
height:30px;
display:block;
margin-left:5px;
margin-top:10px;
margin-bottom:10px;
padding:0 10px;
box-sizing:border-box;

`

const userId = Number(localStorage.getItem('userId'))
const emojikey = process.env.REACT_APP_EMOJI_API_KEY
const giphykey = 'RK8dL5SUArN7v9RBQLL8i6Ar7bMR7Pw6'

export default function Chatroom ({chatroomId, messages}) {
	const [messageData, setMessageData] = useState([{}])
	const [inputValue, setInputValue] = useState('')
	const [listOfEmoji, setListOfEmoji] = useState([])
	const [emojiSection, setEmojiSection] = useState(false)
	const [gifSection, setGifSection] = useState(false)
	const [emojiSearchInput, setEmojiSearchInput] = useState('')
	const [gifSearchInput, setGifSearchInput] = useState('')
	const [newMessageArrived, setNewMessageArrived] = useState(null)
	const messageRef = useRef(null)
	const emojiRef = useRef(null)
	const socketRef = useRef()

	//specify the receiver id oin the chatroom
	const receiverId = messages.filter(chatroom => chatroom.Chatroom_id === chatroomId)[0].receiver_id

	//connect to socket
	useEffect(() => {
		socketRef.current = socket

		//get online users
		socketRef.current.emit('addUser', userId)
		socketRef.current.on('getUsers', users => {
			console.log(users)
		})

		//get messages
		socketRef.current.on('getMessage', data => {
			setNewMessageArrived({
				message:data.text,
				user_id:data.senderId,
				chatroom_id:chatroomId
			})
		})
		
	}, [chatroomId])

	//if new message arrived, set message data
	useEffect(() => {
		newMessageArrived && setMessageData(prev => [...prev, newMessageArrived])
	}, [newMessageArrived])


	//make API calls to giphy and emojis
	useEffect(() => {
		getAllMessages(chatroomId, setMessageData)
		getAllEmoji(emojikey, setListOfEmoji, emojiRef)
	}, [chatroomId])

	//scroll to last message on load
	useEffect(() => {
		const messageMap = getMap(messageRef)
		if (messageData.length > 1) {
			const lastMessageNode = messageMap.get(messageData[messageData.length - 1].id)
			lastMessageNode.scrollIntoView({behavior: 'smooth'})
		}

	},[chatroomId, messageData])

	let messageArr = []
	for (let message of messages) {
		if (message.Chatroom_id === chatroomId) {
			messageArr.push(message)
		}
	}
	const message = {...messageArr[0]}


	//on keyin words
	const onInput = e => {
		setInputValue(e.target.value)
	}

	//Handle sending message
	const onSendMeesage = e => {

		if (e.key === 'Enter') {
			//emit socket event to socket server
			receiverId && socketRef.current.emit('sendMessage', {
				senderId:userId,
				receiverId,
				text:inputValue
			})

			//write into database
			sendMessage(inputValue, setMessageData, messageData, Number(localStorage.getItem('userId')), chatroomId)
			setInputValue('')
			//update the last message right now
			updateLastMessage(localStorage.getItem('userId'), inputValue, chatroomId)
		}
	}

	//get map of nodes
	const getMap = (ref) => {
		if (!ref.current) {
			ref.current = new Map()
		}
		return ref.current
	}

	//get nodes from map
	const getNode = (node, key, ref) => {
		const map = getMap(ref)
		if (node) {
			map.set(key, node)
		}
	}

	//Handle open Emoji section
	const onOpenEmojiSection = () => {
		setEmojiSection(!emojiSection)
		setGifSection(false)
	}

	//Handle open GIF section
	const onOpenGifSection = () => {
		setGifSection(!gifSection)
		setEmojiSection(false)
	}


	//Handle searching emojis
	const onSearchEmoji = e => {
		setEmojiSearchInput(e.target.value)
		setListOfEmoji(emojiRef.current.filter(emoji => emoji.unicodeName.indexOf(e.target.value) !== -1))
	}

	//make giphy calls
	const gf = new GiphyFetch(giphykey)
	const fetchGifs = (offset) => gf.trending({ offset, limit: 10 })

	const onSearchGIF = async e => {
		setGifSearchInput(e.target.value)
	}

	//on sending emojis
	const onSubmitEmoji = (emoji) => {
		setInputValue([...inputValue,emoji].join(''))
	}

	return (
		<ChatroomWrapper>
			<ChatroomTitle>
				<Left>
					<ItemImage image={message.image_1}/>
					<ItemName>{message.itemName}</ItemName>
				</Left>
			</ChatroomTitle>
			<ChatroomBody>
				{messageData.map((message, index) => 
				<div key={`${index}:${message.id}`}>
					{index > 0 ? 
					(differenceInMinutes(parseISO(message.createdAt), parseISO(messageData[index - 1].createdAt)) > 10 ? 
					<Time key={`${message.id}:${index}`}>{parseISO(message.createdAt).toString().split(' GMT+0800 (Taipei Standard Time)')[0]}</Time> : null) : <Time key={`${message.id}:${index}`}>{parseISO(message.createdAt).toString().split(' GMT+0800 (Taipei Standard Time)')[0]}</Time>}
					<Message key={message.id} message={message} ref={node => getNode(node, message.id, messageRef)}/>
				</div>
				)}
			</ChatroomBody>
			{emojiSection ? <EmojiSection>
				<EmojiSearch placeholder='SEARCH EMOJI' onChange={onSearchEmoji} value={emojiSearchInput}></EmojiSearch>
				<Emojis>
					{listOfEmoji.map(emoji => <SingleEmoji onClick={() => onSubmitEmoji(emoji.character)} key={emoji.id}>{emoji.character}</SingleEmoji>)}
				</Emojis>
			</EmojiSection> : null}
			{gifSection ? <GifSection><EmojiSearch placeholder='SEARCH GIFS' onChange={onSearchGIF} value={gifSearchInput}></EmojiSearch>
			<Carousel gifHeight={200} gutter={6} fetchGifs={fetchGifs}></Carousel></GifSection> : null}
			<ChatroomInputWrapper>
				<GifIcon  onClick={onOpenGifSection}/>
				<EmojiIcon onClick={onOpenEmojiSection}></EmojiIcon>
				<ChatroomInput type='text' onChange={onInput} value={inputValue} onKeyDown={onSendMeesage} placeholder='Message...'/>
			</ChatroomInputWrapper>
		</ChatroomWrapper>
	)
}