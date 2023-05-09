import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import MeHeader from '../components/MeHeader'
import MeSidebar from '../components/MeSidebar'
import MeMessages from '../components/MeMessages'
import MeProfile from '../components/MeProfile'
import MeShippingAddress from '../components/MeShippingAddress'
import MeItems from '../components/MeItems'
import {useSelector} from 'react-redux'
import {accountSelector} from '../redux/accountSlice'
import {useNavigate} from 'react-router-dom'
import {messageSelector} from '../redux/messageSlice'
import {MEDIA_QUERY_SM, MEDIA_QUERY_MD} from '../breakpoints'


const MePageWrapper = styled.div `
width:90%;
margin:0 auto;
`

const MeBody = styled.div `
display:flex;
justify-content:center;
align-items:flex-start;
width:100%;
margin-top:30px;
${MEDIA_QUERY_MD} {
	flex-direction:column;
	align-items:center;
}
${MEDIA_QUERY_SM} {
	flex-direction:column;
	align-items:center;
}
`

const RightBodyPart = styled.div `
width:100%;

`



export default function Me () {
	const account = useSelector(accountSelector)
	const navigate = useNavigate()
	const message = useSelector(messageSelector)

	
	
	return (
		<>
			{account.isLogin ? null : navigate('/')}
			<Header />
			<Navbar />
			<MePageWrapper>
				<MeHeader/>
				<MeBody>
					<MeSidebar/>
					<RightBodyPart>
						{message.messageActive ? <MeMessages/> : null}
						{message.myItemsActive ? <MeItems/> : null}
						{message.myProfileActive ? <MeProfile/> : null}
						{message.myShippingActive ? <MeShippingAddress/> : null}
					</RightBodyPart>
				</MeBody>
			</MePageWrapper>
		</>
	)
}