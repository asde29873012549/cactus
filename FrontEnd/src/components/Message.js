import React, { useEffect, useState, forwardRef } from 'react'
import styled from 'styled-components'
import {parseISO, formatDistanceToNow} from 'date-fns'


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

const Message = forwardRef(({message}, ref) => {

	return (
		<Div sender={message.user_id} ref={ref}>
			<TheMessage>{message.message}</TheMessage>
		</Div>
	)
})

export {Message}