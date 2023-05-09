import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Chatroom from './Chatroom'
import ChatList from './ChatList'
import {getUserChatroom} from '../WebAPI'
import {MEDIA_QUERY_SM, MEDIA_QUERY_MD} from '../breakpoints'



const MessageWrapper = styled.div `
margin:0 auto;
width:100%;
`

const MessageHeader = styled.div `
width:90%;
heidht:40px;
display:flex;
${MEDIA_QUERY_MD} {
	width:100%;
}
${MEDIA_QUERY_SM} {
	width:100%;
}
`
const BUYMessage = styled.div `
display:inline-block;
width:50%;
height:100%;
border:1px solid rgba(210, 210, 210, 0.8);
${props => props.buyMessageActive ? 'border-bottom:2px solid #1C1C1C' : null};
font-size:0.9rem;
color:${props => props.buyMessageActive ? '#1C1C1C' : 'white'};
background-color:${props => props.buyMessageActive ? 'white' : 'rgba(210, 210, 210, 0.8)'};
text-align:center;
line-height:40px;
transition:all 0.5s ease-in-out;
&:hover {
	cursor:pointer;
}
`

const SELLMessage = styled.div `
width:50%;
display:inline-block;
height:100%;
border-top:1px solid rgba(210, 210, 210, 0.8);
${props => props.buyMessageActive ? 'border-bottom:1px solid rgba(210, 210, 210, 0.8)' : 'border-bottom:2px solid #1C1C1C'};
border-right:1px solid rgba(210, 210, 210, 0.8);
font-size:0.9rem;
color:${props => props.buyMessageActive ? 'white' : '#1C1C1C'};
background-color:${props => props.buyMessageActive ? 'rgba(210, 210, 210, 0.8)' : 'white'};
text-align:center;
line-height:40px;
transition:border 0.3s ease-in-out;
&:hover {
	cursor:pointer;
}
`

const MessageBody = styled.div `
width:90%;
margin-bottom:100px;
${MEDIA_QUERY_MD} {
	width:100%;
}
${MEDIA_QUERY_SM} {
	width:100%;
}
`



export default function MeMessages () {

	const [buyMessageActive, setBuyMessageActive] = useState(true)
	const [messages, setMessages] = useState([])
	const [chatroomId, setChatroomId] = useState(null)
	const [chatroomActive, setChatroomActive] = useState(false)

	useEffect(() => {
		getUserChatroom(localStorage.getItem('userId'), setMessages)
	},[])

	const onSellActive = () => {
		setBuyMessageActive(!buyMessageActive)
	}

	const onMessageListClick = (id) => {
		setChatroomId(id)
		setChatroomActive(true)
	}

	return (
		<MessageWrapper>
			{
				chatroomActive ?
				<Chatroom chatroomId={chatroomId} messages={messages}/> :
				<>
					<MessageHeader>
						<BUYMessage onClick={onSellActive} buyMessageActive={buyMessageActive}>BUY MESSAGES</BUYMessage>
						<SELLMessage onClick={onSellActive} buyMessageActive={buyMessageActive}>SELL MESSAGES</SELLMessage>
					</MessageHeader>
					<MessageBody>
					{messages
					.filter(message => (buyMessageActive ? message.sender_id : message.receiver_id ) === localStorage.getItem('userId'))
					.map(message => <ChatList key={message.Chatroom_id} message={message} onMessageListClick={onMessageListClick}/>)}
					</MessageBody>
				</>
			}
		</MessageWrapper>
		
		
	)
}


/*

*/