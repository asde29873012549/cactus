import React from 'react'
import styled from 'styled-components'
import {parseISO, formatDistanceToNow} from 'date-fns'
import {MEDIA_QUERY_SM, MEDIA_QUERY_MD} from '../breakpoints'



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
${MEDIA_QUERY_MD} {
	width:30vw;
}
${MEDIA_QUERY_SM} {
	width:30vw;
}
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
${MEDIA_QUERY_MD} {
	width:60vw;
	margin-right:5%;
	font-size:0.6rem;
}
${MEDIA_QUERY_SM} {
	width:60vw;
	margin-right:5%;
	font-size:0.6rem;
}
`

const SentTime = styled.div `
font-size:0.8rem;
color:grey;
${MEDIA_QUERY_MD} {
	font-size:0.4rem;
}
${MEDIA_QUERY_SM} {
	font-size:0.4rem;
}
`

const Sender = styled.div `
font-size:0.8rem;
${MEDIA_QUERY_MD} {
	font-size:0.4rem;
}
${MEDIA_QUERY_SM} {
	font-size:0.4rem;
}
`

const MessageBody = styled.div `
color:grey
${MEDIA_QUERY_MD} {
	font-size:0.6rem;
}
${MEDIA_QUERY_SM} {
	font-size:0.6rem;
}
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