import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import styled from 'styled-components'
import {messageSelector, setSidebarCategoryActive} from '../redux/messageSlice'
import {MEDIA_QUERY_SM, MEDIA_QUERY_MD} from '../breakpoints'


const Hr = styled.div `
width:0;
height:1px;
background-color:#1C1C1C;
transition:all 0.3s ease-in;
`

const Messages = styled.div `
${props => props.active && `color:#1C1C1C;& ${Hr} {width:100%;}`}
transition:all 0.5s ease-in-out;
&:hover {
	cursor:pointer;
	color:#1C1C1C;
}
&:hover ${Hr} {
	width:100%;
	color:#1C1C1C;
}
${MEDIA_QUERY_MD} {
	margin-top:0;
}
${MEDIA_QUERY_SM} {
	margin-top:0;
}
`

const MyItems = styled.div `
${props => props.active && `color:#1C1C1C;& ${Hr} {width:100%;}`}
transition:all 0.5s ease-in-out;
margin-top:20px;
&:hover {
	cursor:pointer;
	color:#1C1C1C;
}
&:hover ${Hr} {
	width:100%;
}
${MEDIA_QUERY_MD} {
	margin-top:0;
}
${MEDIA_QUERY_SM} {
	margin-top:0;
}
`

const ShippingBilling = styled.div `
${props => props.active && `color:#1C1C1C;& ${Hr} {width:100%;}`}
transition:all 0.5s ease-in-out;
margin-top:20px;
&:hover {
	cursor:pointer;
	color:#1C1C1C;
}
&:hover ${Hr} {
	width:100%;
}
${MEDIA_QUERY_MD} {
	margin-top:0;
}
${MEDIA_QUERY_SM} {
	margin-top:0;
}
`

const MyProfile = styled.div `
${props => props.active && `color:#1C1C1C;& ${Hr} {width:100%;}`}
transition:all 0.5s ease-in-out;
margin-top:20px;
&:hover {
	cursor:pointer;
	color:#1C1C1C;
}
&:hover ${Hr} {
	width:100%;
}
${MEDIA_QUERY_MD} {
	margin-top:0;
}
${MEDIA_QUERY_SM} {
	margin-top:0;
}
`

const Settings = styled.div `
${props => props.active && `color:#1C1C1C;& ${Hr} {width:100%;}`}
transition:all 0.5s ease-in-out;
margin-top:20px;
&:hover {
	cursor:pointer;
	color:#1C1C1C;
}
&:hover ${Hr} {
	width:100%;
}
${MEDIA_QUERY_MD} {
	margin-top:0;
}
${MEDIA_QUERY_SM} {
	margin-top:0;
}
`

const LeftBodyPart = styled.div `
font-size:0.9rem;
width:20%;
display:flex;
justify-content:center;
align-items:flex-start;
flex-direction:column;
color:grey;
${MEDIA_QUERY_MD} {
	flex-direction:row;
	width:85vw;
	align-items:center;
	font-size:0.7rem;
	margin-bottom:20px;
	justify-content:space-between;
}
${MEDIA_QUERY_SM} {
	flex-direction:row;
	width:85vw;
	align-items:center;
	font-size:0.6rem;
	margin-bottom:20px;
	justify-content:space-between;
}
`



export default function MeSidebar () {
	const dispatch = useDispatch()
	const message = useSelector(messageSelector)

	const onMessageClick = () => {
		dispatch(setSidebarCategoryActive(['messageActive', 'myItemsActive', 'myProfileActive', 'settingsActive', 'myShippingActive']))
	}

	const onMyItemsClick = () => {
		dispatch(setSidebarCategoryActive(['myItemsActive', 'messageActive', 'myProfileActive', 'settingsActive', 'myShippingActive']))
	}

	const onMyProfileClick = () => {
		dispatch(setSidebarCategoryActive(['myProfileActive', 'myItemsActive', 'messageActive', 'settingsActive', 'myShippingActive']))
	}

	const onSettingsClick = () => {
		dispatch(setSidebarCategoryActive(['settingsActive', 'myItemsActive', 'myProfileActive', 'messageActive', 'myShippingActive']))
	}

	const onMyShippingClick = () => {
		dispatch(setSidebarCategoryActive(['myShippingActive', 'myItemsActive', 'myProfileActive', 'messageActive', 'settingsActive']))
	}

	return (
		<LeftBodyPart>
			<Messages active={ message.messageActive} onClick={onMessageClick}>Messages<Hr /></Messages>
			<MyItems active={ message.myItemsActive} onClick={onMyItemsClick}>My Items<Hr /></MyItems>
			<MyProfile active={ message.myProfileActive} onClick={onMyProfileClick}>My Profile<Hr /></MyProfile>
			<ShippingBilling active={ message.myShippingActive} onClick={onMyShippingClick}>Shipping Address<Hr /></ShippingBilling>
			<Settings active={ message.settingsActive} onClick={onSettingsClick}>Settings<Hr /></Settings>
		</LeftBodyPart>
	)
}