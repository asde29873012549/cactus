import React from 'react'
import styled from 'styled-components'
import facebook from './static/facebook.jpg'
import {MEDIA_QUERY_SM, MEDIA_QUERY_MD} from '../breakpoints'

const FaceBookSignIn = styled.div `
width:100%;
height:40px;
font-weight:bold;
font-size:1rem;
border:1px solid #1C1C1C;
border-radius:8px;
display:flex;
align-items:center;
&:hover {
	cursor:pointer;
}
${MEDIA_QUERY_MD} {
	height:3vh;
	font-size:0.7rem;
}
${MEDIA_QUERY_SM} {
	height:3vh;
	font-size:0.7rem;
}
`

const FaceBookIcon = styled.div `
position:absolute;
background-image:url(${facebook});
width:20px;
height:20px;
background-size:cover;
background-position:center;
margin-left:10px;
`

const Div = styled.div `
margin:0 auto;
`

export default function FaceBookLoginBtn () {

	return (
		<FaceBookSignIn>
			<FaceBookIcon></FaceBookIcon>
			<Div>Continue with FaceBook</Div>
		</FaceBookSignIn>
	)
}