import React from 'react'
import styled from 'styled-components'
import googleIcon from './static/googleIcon.jpg'

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
const googleAPIAddress = process.env.REACT_APP_GOOGLE_API

export default function GoogleLoginBtn () {

	return (
		<GoogleSignIn href={googleAPIAddress}>
			<GoogleIcon></GoogleIcon>
			<Div>Continue with Google</Div>
		</GoogleSignIn>
	)
}