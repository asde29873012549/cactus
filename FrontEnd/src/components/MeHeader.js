import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import {useDispatch} from 'react-redux'
import {setProfileUpdateActive} from '../redux/accountSlice'
import {setSidebarCategoryActive} from '../redux/messageSlice'
import {changeUserAvatar, getUserProfile} from '../WebAPI'
import {MEDIA_QUERY_SM, MEDIA_QUERY_MD} from '../breakpoints'


const Header = styled.div `
display:flex;
justify-content:space-between;
align-items:center;
margin:20px 0;
`

const PhotoWrapper = styled.label `
border-radius:50%;
width:150px;
height:150px;
background-color:rgba(60, 60, 60, 0.4);
display:none;
font-size:0.8rem;
font-weight:700;
color:white;
text-align:center;
line-height:150px;
${MEDIA_QUERY_MD} {
	width:25vw;
	height:25vw;
	line-height:25vw;
	font-size:0.7rem;
}
${MEDIA_QUERY_SM} {
	width:25vw;
	height:25vw;
	line-height:25vw;
	font-size:0.7rem;
}
`

const Avatar = styled.div `
border-radius:50%;
width:150px;
height:150px;
background-color:#DB4D6D;
background-image:url(${props => props.image&&props.image});
background-position:center;
background-size:cover;
filter: drop-shadow(0px 10px 10px rgba(70, 70, 70,.2));
&:hover ${PhotoWrapper} {
	display:block;
	cursor:pointer;
}
${MEDIA_QUERY_MD} {
	width:25vw;
	height:25vw;
}
${MEDIA_QUERY_SM} {
	width:25vw;
	height:25vw;
}
`


const LeftPart = styled.div `
display:flex;
justify-content:center;
align-items:center;
${MEDIA_QUERY_MD} {
	font-size:0.7rem;
}
${MEDIA_QUERY_SM} {
	font-size:0.7rem;
}
`

const Username = styled.div `
margin:0 40px;
${MEDIA_QUERY_MD} {
	margin:0 20px;
}
${MEDIA_QUERY_SM} {
	margin:0 10px;
}
`

const SeparationLineStraight = styled.div `
background-color:grey;
height:60px;
width:1px;
`

const TransactionWrapper = styled.div `
margin:0 40px;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
${MEDIA_QUERY_MD} {
	margin:0 20px;
}
${MEDIA_QUERY_SM} {
	margin:0 10px;
}
`

const Transaction = styled.div `
font-size:1.2rem;
font-weight:800;
${MEDIA_QUERY_MD} {
	font-size:0.8rem;
}
${MEDIA_QUERY_SM} {
	font-size:0.8rem;
}
`

const TransactionWord = styled.div `
font-size:0.8rem;
${MEDIA_QUERY_MD} {
	font-size:0.4rem;
}
${MEDIA_QUERY_SM} {
	font-size:0.4rem;
}
`

const FollowersWrappper = styled.div `
margin:0 40px;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
${MEDIA_QUERY_MD} {
	margin:0 20px;
}
${MEDIA_QUERY_SM} {
	margin:0 10px;
}
`

const Followers = styled.div `
font-size:1.2rem;
font-weight:800;
${MEDIA_QUERY_MD} {
	font-size:0.8rem;
}
${MEDIA_QUERY_SM} {
	font-size:0.8rem;
}
`

const FollowersWord = styled.div `
font-size:0.8rem;
${MEDIA_QUERY_MD} {
	font-size:0.4rem;
}
${MEDIA_QUERY_SM} {
	font-size:0.4rem;
}
`

const EditProfile = styled.div `
text-align:center;
line-height:40px;
width:150px;
height:40px;
background-color:#1C1C1C;
border-radius:7px;
border:1.5px solid #1C1C1C;
color:white;
font-size:0.9rem;
&:hover {
	cursor:pointer;
	background-color:white;
	color:#1C1C1C;
	border:1.5px solid #1C1C1C;
}
${MEDIA_QUERY_MD} {
	width:12vw;
	height:2vh;
	font-size:0.7rem;
	line-height:2vh;
}
${MEDIA_QUERY_SM} {
	width:12vw;
	height:2vh;
	font-size:0.5rem;
	line-height:2vh;
}
`

const SeparationLineBig = styled.hr `
background-color:grey;
`



const PhotoInput = styled.input `
display:none;
`


export default function MeHeader () {
	const dispatch = useDispatch()
	const photoRef = useRef(null)
	const avatarRef = useRef(null)
	const [userProfile, setUserProfile] = useState({})
	const userId = localStorage.getItem('userId')

	useEffect(() => {
		getUserProfile(userId, setUserProfile)

		return () => {
			setUserProfile({})
		}
	}, [userId])

	const onEditProfile = () => {
		dispatch(setSidebarCategoryActive(['myProfileActive', 'myItemsActive', 'messageActive', 'settingsActive']))
		dispatch(setProfileUpdateActive())
	}

	const onImageUpload = () => {
		const reader = new FileReader()
		reader.readAsDataURL(photoRef.current.files[0])
		reader.addEventListener('load', () => {
			const uploaded_result = reader.result
			avatarRef.current.style.backgroundImage = `url(${uploaded_result})`
			avatarRef.current.style.backgroundSize = 'cover'
			avatarRef.current.style.backgroundPosition = 'center'
		})

		const formData = new FormData()
		formData.append('images', photoRef.current.files[0], 'avatar')

		changeUserAvatar(formData, userId)
	}


	return (
		<>
		<Header>
			<LeftPart>
				<Avatar ref={avatarRef} image={userProfile.avatar}>
					<PhotoWrapper>UPLOAD PHOTO
						<PhotoInput ref={photoRef} onChange={onImageUpload} type='file' accept='image/png, image/jpg'></PhotoInput>
					</PhotoWrapper>
				</Avatar>
				<Username>{userProfile.username}</Username>
				<SeparationLineStraight />
				<TransactionWrapper>
					<Transaction>3</Transaction>
					<TransactionWord>Transactions</TransactionWord>
				</TransactionWrapper>
				<SeparationLineStraight />
				<FollowersWrappper>
					<Followers>3</Followers>
					<FollowersWord>Transactions</FollowersWord>
				</FollowersWrappper>
			</LeftPart>
			<EditProfile onClick={onEditProfile}>Edit Profile</EditProfile>
		</Header>
		<SeparationLineBig/>
		</>
	)
}