import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {getUserProfile, updateProfile} from '../WebAPI'
import {useDispatch, useSelector} from 'react-redux'
import {setProfileUpdateActive, accountSelector} from '../redux/accountSlice'


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
`

const Div = styled.div `
height:30px;
width:500px;
color:grey;
box-sizing:border-box;
font-size:1rem;
&:focus {
	outline: none !important;
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
`

export default function MeShippingAddress () {
	const [userProfile, setUserProfile] = useState([{}])
	const dispatch = useDispatch()
	const profileUpdate = useSelector(accountSelector)

	const [address, setAddress] = useState(null)
	const [city, setCity] = useState(null)
	const [nation, setNation] = useState(null)
	
	useEffect(() => {
		getUserProfile(localStorage.getItem('userId'), setUserProfile)
		setAddress(userProfile.address)
		setCity(userProfile.city)
		setNation(userProfile.bio)

		return (
			function () {
				if (profileUpdate.profileUpdateActive === true) {
					dispatch(setProfileUpdateActive())
				}
			}
		)
	},[userProfile.address])

	const onAddressChane = e => {
		setAddress(e.target.value)
	}

	const onCityChnage = e => {
		setCity(e.target.value)
	}

	const onNationCange = e => {
		setNation(e.target.value)
	}

	const onProfileUpdate = () => {
		dispatch(setProfileUpdateActive())
	}

	const onSaveProfileUpdate = () => {
		updateProfile(localStorage.getItem('userId'), address, city, nation)
		dispatch(setProfileUpdateActive())
	}

	return (
		<ProfileWrapper>
			<Section>
				<Title>ADDRESS</Title>
				{profileUpdate.profileUpdateActive ? <Input onChange={onAddressChane} value={address}/> : <Div>{userProfile.address}</Div>}
			</Section>
			<Section>
				<Title>CITY</Title>
				{profileUpdate.profileUpdateActive ? <Input onChange={onCityChnage} value={city}/> : <Div>{userProfile.city}</Div>}
			</Section>
			<Section>
				<Title>NATION</Title>
				{profileUpdate.profileUpdateActive ? <Input onChange={onNationCange} value={nation}/> : <Div>{userProfile.nation}</Div>}
			</Section>
			<BtnSection>
				{profileUpdate.profileUpdateActive ? <Btn onClick={onSaveProfileUpdate}>SAVE</Btn> : <Btn onClick={onProfileUpdate}>EDIT SHIPPING ADDRESS</Btn>}
			</BtnSection>
		</ProfileWrapper>
	)
}
