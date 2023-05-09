import React from 'react'
import styled from 'styled-components'
import googleIcon from './static/googleIcon.jpg'
import {MEDIA_QUERY_SM, MEDIA_QUERY_MD} from '../breakpoints'

const GoogleSignIn = styled.a `
width:100%;
height:40px;
font-weight:bold;
font-size:1rem;
border:1px solid #1C1C1C;
border-radius:8px;
display:flex;
align-items:center;
text-decoration:none;
color:#1C1C1C;
${MEDIA_QUERY_MD} {
	height:3vh;
	font-size:0.7rem;
}
${MEDIA_QUERY_SM} {
	height:3vh;
	font-size:0.7rem;
}
`

const GoogleIcon = styled.div `
position:absolute;
background-image:url(${googleIcon});
width:20px;
height:20px;
background-size:cover;
background-position:center;
margin-left:10px;
`

const Div = styled.div `
margin:0 auto;
`
const googleAPIAddress = 'https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&response_type=code&client_id=777139525803-5tlmbjrak135amngsjcb9jmdcijqk5qi.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fcactus-luxury.com%2Fapi%2FOauth2%2Fgoogle'

export default function GoogleLoginBtn () {


	return (
		<GoogleSignIn href={googleAPIAddress}>
			<GoogleIcon></GoogleIcon>
			<Div>Continue with Google</Div>
		</GoogleSignIn>
	)
}