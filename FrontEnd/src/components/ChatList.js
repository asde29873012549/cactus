import React from 'react'
import styled from 'styled-components'
import {parseISO, formatDistanceToNow} from 'date-fns'



const Message = styled.div `
border-bottom:1px solid rgba(210, 210, 210, 0.8);
border-right:1px solid rgba(210, 210, 210, 0.8);
border-left:1px solid rgba(210, 210, 210, 0.8);
display:flex;
align-items:center;
font-size:0.9rem;
padding:0 20px;
height:100px;
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
&:hover {
	cursor:pointer;
}
`

const Left = styled.div `
display:flex;
align-items:center;
`

const Middle = styled.div `
width:40%;
`

const Right = styled.div `
width:30%;
display:flex;
flex-direction:column;
align-items:flex-end;
justify-content:center;
`
const ItemName = styled.div `
font-weight:800;
width:200px;
margin-right:30px;
&:hover {
	cursor:pointer;
}
`

const SentTime = styled.div `
font-size:0.8rem;
color:grey;
`

const Sender = styled.div `
font-size:0.8rem;
`

const MessageBody = styled.div `
color:grey
`

export default function ChatList ({message, onMessageListClick}) {
	
	//Handle enter chatroom on click message title
	const onMessageTitleClick = () => {
		onMessageListClick(message.Chatroom_id)
	}

	return (
		<Message>
			<Left>
				<ItemImage image={message.image_1} onClick={onMessageTitleClick}/>
				<ItemName onClick={onMessageTitleClick}>{message.itemName}</ItemName>
			</Left>
			<Middle>
				<MessageBody>{message.last_message}</MessageBody>
			</Middle>
			<Right>
				<SentTime>{formatDistanceToNow(parseISO(message.createdAt))}</SentTime>
				<Sender>{message.username}</Sender>
			</Right>
		</Message>
	)
}