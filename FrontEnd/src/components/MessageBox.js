import React from 'react'
import styled from 'styled-components'
import {parseISO, differenceInMinutes} from 'date-fns'
import {MEDIA_QUERY_SM, MEDIA_QUERY_MD} from '../breakpoints'

const Message = styled.div `
width:320px;
height:450px;
position:fixed;
top:34%;
left:75%;
${MEDIA_QUERY_MD} {
	top:29vh;
	left:50%;
	transform:translate(-50%, 0);
	margin:0 auto;
}
${MEDIA_QUERY_SM} {
	top:29vh;
	left:50%;
	transform:translate(-50%, 0);
	margin:0 auto;
}
`

const MessageBoxInput = styled.input `
height:10%;
background-color:white;
border:1px solid rgb(200, 200, 200);
border-radius:20px;
width:300px;
position:absolute;
margin-top:-16%;
margin-left:10px;
padding:0 15px;
box-sizing:border-box;
color:grey;
&:focus {
	outline: none !important;
}
`

const MessageBoxBody =styled.div `
height:90%;
background-color:white;
border:1.5px solid rgb(200, 200, 200);
border-radius:10px;
padding:10px 10px;
position:relative;
overflow:scroll;
padding-bottom:45px;
::-webkit-scrollbar {
    display: none;
}
`

const Time = styled.div `
color:#828282;
font-size:0.7rem;
margin:0 auto;
text-align:center;
width:200px
`

const TheMessage = styled.div `
border:1px solid rgb(190, 190, 190);
border-radius:20px;
color:grey;
padding:10px 20px;
display:inline-block;
font-size:0.9rem;
margin:10px 0;
`
const Div = styled.div `
display:flex;
justify-content:${props => props.sender === Number(localStorage.getItem('userId')) ? 'flex-end' : 'flex-start'};
align-items:center;
`


export default function MessageBox ({messageData, onInput, onSend, inputValue, messageBoxRef}) {


	return (
		<Message ref={messageBoxRef}>
			{console.log(messageData)}

			<MessageBoxBody>
			{messageData !== [{}] && messageData.length > 0 && messageData[0].createdAt ? 
				<div>{messageData.map((message, index) => 
				<div key={`${message.id}:${index}`}>
					{console.log(message)}
					{/*check if theres already messages in the message box*/}
					{messageData !== [{}] && messageData.length > 0 && index > 0 ? 
					(differenceInMinutes(parseISO(message.createdAt), parseISO(messageData[index - 1].createdAt)) > 10 ? 
					<Time key={`${index}:${message.id}`}>{parseISO(message.createdAt).toString().split(' GMT+0800 (Taipei Standard Time)')[0]}</Time> : null) : <Time key={`${index}:${message.id}`}>{parseISO(message.createdAt).toString().split(' GMT+0800 (Taipei Standard Time)')[0]}</Time>}
					<Div sender={message.user_id} key={message.id} >
						<TheMessage>{message.message}</TheMessage>
					</Div>
				</div>
				)}</div>:null}
			</MessageBoxBody>
			<MessageBoxInput onKeyDown={onSend} type='text' onChange={onInput} value={inputValue} placeholder='Message...'></MessageBoxInput>
		</Message>
	)
}



