import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {getUserProfile, updateProfile} from '../WebAPI'
import {useDispatch, useSelector} from 'react-redux'
import {setProfileUpdateActive, accountSelector} from '../redux/accountSlice'
import {MEDIA_QUERY_SM, MEDIA_QUERY_MD} from '../breakpoints'


const ProfileWrapper = styled.div `

`


const Section = styled.div `
display:flex;
margin:20px 0;
align-items:center;
`


const Title = styled.div `
font-size:0.9rem;
letter-spacing:5px;
width:200px;
color:grey;
font-weight:900;
${MEDIA_QUERY_MD} {
	font-size:0.8rem;
}
${MEDIA_QUERY_SM} {
	font-size:0.7rem;
}
`

const Div = styled.div `
height:30px;
width:500px;
color:grey;
box-sizing:border-box;
font-size:1rem;
line-height:30px;
&:focus {
	outline: none !important;
}
${MEDIA_QUERY_MD} {
	font-size:0.8rem;
	margin-left:10px;
}
${MEDIA_QUERY_SM} {
	font-size:0.7rem;
	margin-left:10px;
}
`

const Input = styled.input `
height:30px;
width:400px;
color:grey;
height:30px;
border:1px solid rgb(230, 230, 230);
border-radius:8px;
padding:0 10px;
box-sizing:border-box;
font-size:0.8rem;
&:focus {
	outline: none !important;
}
${MEDIA_QUERY_MD} {
	font-size:0.7rem;
}
${MEDIA_QUERY_SM} {
	font-size:0.6rem;
}
`

const Text = styled.textarea `
width:500px;
color:grey;
font-size:0.8rem;
height:60px;
border:1px solid rgb(230, 230, 230);
border-radius:8px;
padding:5px 10px;
font-family:YuGothic;
box-sizing:border-box;
&:focus {
	outline: none !important;
}
${MEDIA_QUERY_MD} {
	font-size:0.7rem;
}
${MEDIA_QUERY_SM} {
	font-size:0.6rem;
}
`

const BtnSection = styled.div `
display:flex;
align-items:center;
justify-content:center;
`

const Btn = styled.div `
text-align:center;
line-height:40px;
width:200px;
height:40px;
background-color:#1C1C1C;
border-radius:7px;
border:1.5px solid #1C1C1C;
color:white;
font-size:0.9rem;
margin:30px 30px;
&:hover {
	cursor:pointer;
	background-color:white;
	color:#1C1C1C;
	border:1.5px solid #1C1C1C;
}
${MEDIA_QUERY_MD} {
	font-size:0.8rem;
	width:100px;
	height:30px;
	line-height:30px;
}
${MEDIA_QUERY_SM} {
	font-size:0.7rem;
	width:100px;
	height:30px;
	line-height:30px;
}
`

export default function MeProfile () {
	const [userProfile, setUserProfile] = useState([{}])
	const dispatch = useDispatch()
	const profileUpdate = useSelector(accountSelector)

	const [username, setUsername] = useState(null)
	const [email, setEmail] = useState(null)
	const [bio, setBio] = useState(null)
	
	useEffect(() => {
		getUserProfile(localStorage.getItem('userId'), setUserProfile)
		setUsername(userProfile.username)
		setEmail(userProfile.email)
		setBio(userProfile.bio)

		return (
			function () {
				if (profileUpdate.profileUpdateActive === true) {
					dispatch(setProfileUpdateActive())
				}
			}
		)
	},[userProfile.username])

	const onUsernameChange = e => {
		setUsername(e.target.value)
	}

	const onEmailChange = e => {
		setEmail(e.target.value)
	}

	const onBioChange = e => {
		setBio(e.target.value)
	}

	const onProfileUpdate = () => {
		dispatch(setProfileUpdateActive())
	}

	const onSaveProfileUpdate = () => {
		updateProfile(localStorage.getItem('userId'), username, email, bio)
		dispatch(setProfileUpdateActive())
	}

	return (
		<ProfileWrapper>
			<Section>
				<Title>USERNAME</Title>
				{profileUpdate.profileUpdateActive ? <Input onChange={onUsernameChange} value={username}/> : <Div>{userProfile.username}</Div>}
			</Section>
			<Section>
				<Title>EMAIL</Title>
				{profileUpdate.profileUpdateActive ? <Input onChange={onEmailChange} value={email}/> : <Div>{userProfile.email}</Div>}
			</Section>
			<Section>
				<Title>BIO</Title>
				{profileUpdate.profileUpdateActive ? <Text onChange={onBioChange} value={bio}/> : <Div>{userProfile.bio}</Div>}
			</Section>
			<BtnSection>
				{profileUpdate.profileUpdateActive ? <Btn onClick={onSaveProfileUpdate}>SAVE</Btn> : <Btn onClick={onProfileUpdate}>EDIT PROFILE</Btn>}
				
				<Btn>CHANGE PASSWORD</Btn>
			</BtnSection>
		</ProfileWrapper>
	)
}
