import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import searchImage from './static/search.png'
import shoppingCartImage from './static/shopping-cart.png'
import {useDispatch, useSelector} from 'react-redux'
import {openLoginForm, accountSelector, handleLogin, handleLogout, storeUser} from '../redux/accountSlice'
import {Link} from 'react-router-dom'
import {getMe} from '../WebAPI'
import {LogoutAction, LoginAction} from './utils'
import {MEDIA_QUERY_MD, MEDIA_QUERY_SM} from '../breakpoints'

const NavbarWrapper = styled.div `
display:flex;
justify-content:space-between;
align-items:center;
width:90vw;
height:15vh;
margin:0 auto;

${MEDIA_QUERY_SM} {
flex-direction:column;
height:auto;
}
`

const BrandName = styled(Link) `
font-size:2rem;
font-weight:900;
letter-spacing:10px;
text-decoration:none;
color:#1C1C1C;

${MEDIA_QUERY_SM} {
letter-spacing:5px;
}
`

const SearchBarContainer = styled.div `
width:35vw;
max-height:5vh;
display:flex;
align-items:center;
${MEDIA_QUERY_SM} {
	display:none;
}
`

const SearchBar = styled.input `
display:flex;
justify-content:flex-end;
align-items:center;
border-radius:7px;
border:1px solid grey;
padding:5px 10px;
width:100%;
box-sizing:border-box;
height:100%;
color:grey;
`

const SearchIcon = styled.div `
background-image:url(${searchImage});
background-position:center;
background-size:cover;
background-repeat:no-repeat;
width:20px;
height:20px;
position:relative;
margin-left:-30px;
`

const FeaturesWrapper = styled.div `
display:flex;
font-size:clamp(12px, 100%, 0.8rem);
font-weight:bold;
align-items:center;
justify-content:space-between;
width:25%;
${MEDIA_QUERY_SM} {
	position:fixed;
	bottom:0px;
	background-color:white;
	width:100vw;
	padding:2vh 10vw;
	box-sizing:border-box;
	z-index:2;
}
`

const Sell = styled(Link) `
text-decoration:none;
color:#1C1C1C;
&:hover {
	cursor:pointer;
}
`

const Shop = styled(Link) `
text-decoration:none;
color:#1C1C1C;
&:hover {
	cursor:pointer;
}
`

const Login = styled.div `
&:hover {
	cursor:pointer;
}
`

const Logout = styled(Link) `
text-decoration:none;
color:#1C1C1C;
&:hover {
	cursor:pointer;
}
`

const ShoppingCart = styled(Link) `
background-image:url(${shoppingCartImage});
width:28px;
height:28px;
background-size:cover;
&:hover {
	cursor:pointer;
}
${MEDIA_QUERY_SM} {
	width:18px;
	height:18px;
}
`

const Me = styled(Link) `
border-radius:50%;
background-color:#DB4D6D;;
width:28px;
height:28px;
&:hover {
	cursor:pointer;
}
${MEDIA_QUERY_SM} {
	width:18px;
	height:18px;
}
`

export default function Header () {
	const dispatch = useDispatch()
	const [input, setInput] = useState('')
	const account = useSelector(accountSelector)
	

	useEffect(() => {
		//get cookies from data
		const cookieArr = document.cookie.split(';')
		let temp = []
		cookieArr.forEach(cookie => {
			const cookiePair = cookie.split('=')
			const cookieArray = cookiePair.map(cookie => cookie.trim())
			temp.push(cookieArray)
		})

		const cookieValue = Object.fromEntries(temp)

		//retrieve auth datas from cookies
		//only needed if you are login using google
		const isAuth = cookieValue.isAuth
		const token = cookieValue.token
		const username = cookieValue.username
		const userId = cookieValue.userId

		if (isAuth && token && username && userId) {
			LoginAction.setIsAuth(isAuth)
			LoginAction.setToken(token)
			LoginAction.setUsername(decodeURIComponent(username))
			LoginAction.setUserId(userId)
			getMe(isAuth, token, dispatch, handleLogin, handleLogout, storeUser)
		} else {
			const authKey = localStorage.getItem('isAuth')
			const refreshToken = localStorage.getItem('token')
			getMe(authKey,refreshToken, dispatch, handleLogin, handleLogout, storeUser)
		}
		
	},[dispatch])

	//open login form 
	const onOpenLogin = () => {
		dispatch(openLoginForm())
	}

	//Handle search input
	const onSearchInputChange = e => {
		setInput(e.target.value)
	}

	//Handle Logout
	const onLogout = () => {
		dispatch(handleLogout())
		LogoutAction.clearIsAuth()
		LogoutAction.clearToken()
		LogoutAction.clearUsername()
		LogoutAction.clearTokenCookie()
		LogoutAction.clearIsAuthCookie()
		LogoutAction.clearUsernameCookie()
	}


	return (
		<NavbarWrapper>
			<BrandName to='/'>CACTUS</BrandName>
			<SearchBarContainer>
				<SearchBar value={input} onChange={onSearchInputChange} placeholder='Search'></SearchBar>
				<SearchIcon></SearchIcon>
			</SearchBarContainer>
			<FeaturesWrapper>
				{ account.isLogin ? 
				<Logout onClick={onLogout} to='/'>LOGOUT</Logout>:
				<Login onClick={onOpenLogin}>LOGIN</Login>
				}
				<Sell to='/sell'>SELL</Sell>
				<Shop to='/shop'>SHOP</Shop>
				<ShoppingCart to='/shoppingCart'></ShoppingCart>
				{account.isLogin ? <Me to='/me'></Me> : null}
			</FeaturesWrapper>
		</NavbarWrapper>
	)
}