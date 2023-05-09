import React from 'react'
import styled from 'styled-components'

const BackgroundWrapper = styled.div `
width:100vw;
height:100vh;
background-color:rgba(0, 0, 0, 0.8);
position:fixed;
z-index:3;
`

const BoxWrapper = styled.div `
border-radius:10px;
background-color:transparent;
width:${props => props.active ? props.width : null};
height:100px;
text-align:center;
padding:20px 10px;
position:fixed;
z-index:${props => props.active ? '4' : '-3'};
top:${props => props.active ? '50%' : '40%'};
left:50%;
transform:translate(-50%, -50%);
font-weight:800;
color:#D05A6E;
font-size:1.3rem;
transition:all 0.5s ease-in-out;
opacity:${props => props.active ? '1' : '0'};
display:flex;
flex-direction:column;
align-items:center;
justify-content:space-between;
`

const DropdownWrapper = styled.div `
font-size:0.9rem;
color:#1C1C1C;
background-color:white;
position:absolute;
z-index:4;
margin-top:1px;
border-radius:0 0 2px 2px;
filter: drop-shadow(0px 25px 20px rgba(70, 70, 70,.4));
${props => props.isActive ? 'null' : 'display:none'}
`

//plain black background
function BlackBackground ({onBackgroundClick}) {

	return (
		<BackgroundWrapper onClick={onBackgroundClick}/>
	)
}

//popup content box
function PopUpBox ({children, width, active}) {
	return (
		<BoxWrapper width={width} active={active}>{children}</BoxWrapper>
	)
}

//Logout action wrapper
const LogoutAction = {
	clearIsAuth: () => localStorage.removeItem('isAuth'),
	clearToken: () => localStorage.removeItem('token'),
	clearUsername: () => localStorage.removeItem('username'),
	clearUserId: () => localStorage.removeItem('userId'),
	clearIsAuthCookie: () => document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;',
	clearTokenCookie: () => document.cookie = 'isAuth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;',
	clearUsernameCookie: () => document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;',
	clearUserIdCookie: () => document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}

//login action wrapper
const LoginAction = {
	setIsAuth: (auth) => localStorage.setItem('isAuth', auth),
	setToken: (token) => localStorage.setItem('token', token),
	setUsername: (username) => localStorage.setItem('username', username),
	setUserId: (userId) => localStorage.setItem('userId', userId),
	setIsAuthCookie: (auth) => document.cookie = `isAuth=${auth}`
}

//Dropdon menu
function DropdownMenu ({children, isActive, className}) {
	return (
		<DropdownWrapper isActive={isActive} className={className}>
			{children}
		</DropdownWrapper>
	)
}

//A function that can convert all capital words to only first digit capital
function ConvertToCapital (string) {
	if (!string) return
	return string
	.toLowerCase()
	.split(' ')
	.map(str => str[0].toUpperCase() + str.slice(1))
	.join(' ')
}

export {BlackBackground, PopUpBox, LogoutAction, LoginAction, DropdownMenu, ConvertToCapital}
