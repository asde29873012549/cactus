import React, {useState} from 'react'
import styled from 'styled-components'
import cancel from './static/x-circle.svg'
import {useSelector, useDispatch} from 'react-redux'
import {accountSelector, openLoginForm, switchLoginToRegister, handleLogin, storeUser} from '../redux/accountSlice'
import {registerUser, loginUser} from '../WebAPI'
import GoogleLoginBtn from './GoogleLoginButton'
import FaceBookLoginBtn from './FaceBookLoginButton'
import {MEDIA_QUERY_SM, MEDIA_QUERY_MD} from '../breakpoints'

const Form = styled.form `
position:fixed;
display:flex;
width:30vw;
height:${props => props.opened ? '80vh' : '0'};
border-radius:8px;
background-color:white;
margin:auto;
top:0;
bottom:0;
left:0;
right:0;
z-index:4;
flex-direction:column;
justify-content:space-evenly;
align-items:center;
padding:${props => props.opened ? '30px 60px' : '0'};
box-sizing:border-box;
transition:opacity 0.3s ease-in-out;
overflow:hidden;
opacity:${props => props.opened ? '1' : '0'};
${MEDIA_QUERY_MD} {
	width:50vw;
	height:${props => props.opened ? '50vh' : '0'};
}
${MEDIA_QUERY_SM} {
	width:80vw;
	height:${props => props.opened ? '50vh' : '0'};
}
`

const Wrapper = styled.div `
font-size:1rem;
width:100%;
display:flex;
justify-content:center;
align-items:center;
`

const SignIn = styled.div `
font-weight:${props => props.selected ? 'normal' : '800'};
&:hover {
	cursor:pointer;
}
`

const Register = styled.div `
font-weight:${props => props.selected ? '800' : 'normal'};
margin-left:20px;
&:hover {
	cursor:pointer;
}
`

const Username = styled.div `
width:100%;
`

const UsernameInput = styled.input `
height:35px;
width:100%;
box-sizing:border-box;
${MEDIA_QUERY_MD} {
	height:3vh;
}
${MEDIA_QUERY_SM} {
	height:3vh;
}
`

const Email = styled.div `
width:100%;
`

const EmailInput = styled.input `
height:35px;
width:100%;
box-sizing:border-box;
${MEDIA_QUERY_MD} {
	height:3vh;
}
${MEDIA_QUERY_SM} {
	height:3vh;
}
`

const Password = styled.div `
width:100%;
`

const PasswordInput = styled.input `
height:35px;
width:100%;
box-sizing:border-box;
${MEDIA_QUERY_MD} {
	height:3vh;
}
${MEDIA_QUERY_SM} {
	height:3vh;
}
`

const SignInSubmit = styled.input `
width:100%;
height:40px;
color:white;
font-weight:bold;
font-size:1.1rem;
background-color:#1C1C1C;
border:1px solid #1C1C1C;
border-radius:8px;
&:hover {
	cursor:pointer;
}
${MEDIA_QUERY_MD} {
	height:3vh;
}
${MEDIA_QUERY_SM} {
	height:3vh;
}
`

const RegisterSubmit = styled.input `
width:100%;
height:40px;
color:white;
font-weight:bold;
font-size:1.1rem;
background-color:#1C1C1C;
border:1px solid #1C1C1C;
border-radius:8px;
&:hover {
	cursor:pointer;
}
${MEDIA_QUERY_MD} {
	height:3vh;
}
${MEDIA_QUERY_SM} {
	height:3vh;
}
`

const OR = styled.div `
${MEDIA_QUERY_MD} {
	font-size:0.7rem;
}
${MEDIA_QUERY_SM} {
	font-size:0.7rem;
}
`

const Name = styled.div `
font-size:0.8rem;
margin-bottom:5px;
color:grey;
`

const Cancel = styled.div `
background-image:url(${cancel});
background-position:center;
background-size:cover;
width:18px;
height:18px;
position:absolute;
top:12px;
right:12px;
&:hover {
	cursor:pointer;
}
`

const TermsAndConditions = styled.div `
white-space:pre-wrap;
word-break:break-all;
font-size:0.8rem;
color:rgba(0, 0, 0, 0.7);
${MEDIA_QUERY_MD} {
	font-size:0.6rem;
}
${MEDIA_QUERY_SM} {
	font-size:0.6rem;
}
`

const WrapperforInputs = styled.div `
height:80%;
width:100%;
display:flex;
justify-content:space-between;
flex-direction:column;
align-items:center;
`

const Warning = styled.div `
font-size:0.8rem;
color:#DB4D6D;
text-align:center;
width:100%;
height:15px;
line-height:15px;
`

export default function AccountForm () {
	const account = useSelector(accountSelector)
	const dispatch = useDispatch()
	const [registerUsername, setRegisterUsername] = useState('')
	const [registerEmail, setRegisterEmail] = useState('')
	const [registerPassword, setRegisterPassword] = useState('')
	const [loginUsername, setLoginUsername] = useState('')
	const [loginPassword, setLoginPassword] = useState('')
	const [warning, setWarning] = useState('')


	const onCancelLoginForm = () => {
		dispatch(openLoginForm())
	}

	const onToggleSignIn = () => {
		dispatch(switchLoginToRegister())
	}

	const onToggleRegister = () => {
		dispatch(switchLoginToRegister())
	}

	const onRegisterUsernameChange = e => {
		setRegisterUsername(e.target.value)
	}

	const onRegisterEmailChange = e => {
		setRegisterEmail(e.target.value)
	}

	const onRegisterPasswordChange = e => {
		setRegisterPassword(e.target.value)
	}

	const onLoginUsernameChange = e => {
		setLoginUsername(e.target.value)
	}

	const onLoginPasswordChange = e => {
		setLoginPassword(e.target.value)
	}

	const onSubmit = e => {
		e.preventDefault()

		if (account.isRegisterActive === true) {
			if (registerUsername !== '' && registerEmail !== '' && registerPassword !== '') {
				const data = {
					username:registerUsername,
					email:registerEmail,
					password:registerPassword
				}
				const result = registerUser(data)
				setRegisterUsername('')
				setRegisterEmail('')
				setRegisterPassword('')
				if (result === 'exist') {
					setWarning('The username has been used, please try again')
				}
			} else {
				setWarning('Missing Info')
			}
			
		} else {
			if (loginUsername !== '' && loginPassword !== '') {
				const data = {
					username:loginUsername,
					password:loginPassword
				}
				loginUser(data, dispatch, storeUser)
				dispatch(handleLogin())
				setLoginUsername('')
				setLoginPassword('')
			} else {
				setWarning('Missing Info')
			}
		}
		dispatch(openLoginForm())
	
	}

	return (
		<>
		<Form opened={account.isLoginFormOpen} onSubmit={onSubmit}>
			<Cancel onClick={onCancelLoginForm}/>
			<Wrapper>
				<SignIn onClick={onToggleSignIn} selected={account.isRegisterActive}>SIGN IN</SignIn>
				<Register onClick={onToggleRegister} selected={account.isRegisterActive}>REGISTER</Register>
			</Wrapper>
			<Warning>{warning}</Warning>
			{account.isRegisterActive ? 
			
			<WrapperforInputs>
				<Username>
					<label>
						<Name>USERNAME</Name>
						<UsernameInput value={registerUsername} onChange={onRegisterUsernameChange}/>
					</label>
				</Username>
				<Email>
					<label>
						<Name>EMAIL</Name>
						<EmailInput value={registerEmail} onChange={onRegisterEmailChange}/>
					</label>
				</Email>
				<Password>
					<label>
						<Name>PASSWORD</Name>
						<PasswordInput value={registerPassword} onChange={onRegisterPasswordChange}/>
					</label>
				</Password>
				<TermsAndConditions>By registering, you agree with our Terms & Conditions and Privacy and Cookie Policy.</TermsAndConditions>
				<RegisterSubmit type='submit' value='Register'></RegisterSubmit>
			</WrapperforInputs>

			: 
			<WrapperforInputs>
				<Email>
					<label>
						<Name>USERNAME</Name>
						<UsernameInput value={loginUsername} onChange={onLoginUsernameChange}/>
					</label>
				</Email>
				<Password>
					<label>
						<Name>PASSWORD</Name>
						<PasswordInput value={loginPassword} onChange={onLoginPasswordChange}/>
					</label>
				</Password>
				<SignInSubmit type='submit' value='Sign In'></SignInSubmit>
				<OR>OR</OR>
				<GoogleLoginBtn/>
				<FaceBookLoginBtn/>
			</WrapperforInputs>
			}
		</Form>
		</>
		
	)
}
