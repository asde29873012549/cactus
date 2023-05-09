import React from 'react'
import styled from 'styled-components'
import video from './static/prada_2021_menswear_video.mp4'
import staticBanner from './static/prada_banner.jpg'
import {Link} from 'react-router-dom'
import {MEDIA_QUERY_SM, MEDIA_QUERY_MD} from '../breakpoints'


const BannerVideo = styled.video `

`

const BannerImg = styled.div `
display:none;
${MEDIA_QUERY_MD} {
	display:block;
	background-image:url(${staticBanner});
	background-size:cover;
	width:100vw;
	height:30vh;
}
${MEDIA_QUERY_SM} {
	display:block;
	background-image:url(${staticBanner});
	background-size:cover;
	width:100vw;
	height:30vh;
}
`

const Title = styled.div `
font-size:2.2rem;
color:white;
font-weight:bold;
z-index:2;
${MEDIA_QUERY_MD} {
	font-size:1.5rem;
}
${MEDIA_QUERY_SM} {
	font-size:1rem;
}
`

const Content = styled.p `
font-size:1.5rem;
color:white;
z-index:2;
font-weight:400;
margin:40px 0;
${MEDIA_QUERY_MD} {
	margin:20px 0;
	font-size:1rem;
}
${MEDIA_QUERY_SM} {
	margin:8px 0;
	font-size:0.8rem;
}
`

const ButtonWrapper = styled.div `
z-index:2;
`

const MensWear = styled(Link) `
border:1px solid white;
padding:21px 40px;
width:18vw;
height:10vh;
text-decoration:none;
background-color:transparent;
border-radius:4px;
font-size:1.2rem;
color:white;
font-weight:800;
&:hover {
	background-color:white;
	cursor:pointer;
	color:#1C1C1C;
}
${MEDIA_QUERY_MD} {
	font-size:0.9rem;
	padding:10px 15px;
}
${MEDIA_QUERY_SM} {
	font-size:0.8rem;
	padding:8px 10px;
}
`

const WomensWear = styled(Link) `
border:1px solid white;
width:18vw;
padding:21px 24px;
margin-left:40px;
height:10vh;
text-decoration:none;
font-weight:800;
background-color:transparent;
border-radius:4px;
font-size:1.2rem;
color:white;
&:hover {
	background-color:white;
	cursor:pointer;
	color:#1C1C1C;
}
${MEDIA_QUERY_MD} {
	font-size:0.9rem;
	padding:10px 15px;
}
${MEDIA_QUERY_SM} {
	font-size:0.8rem;
	padding:8px 10px;
	margin-left:20px;
}
`

const Div = styled.div `
overflow:hidden;
width:100vw;
`

const BannerWrapper = styled.div `
position:absolute;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
width:100vw;
`

const D = styled.div `
position:relative;
display:flex;
align-items:center;
`


export default function Banner () {


	let isMobile = false
	
	const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ? isMobile = true
    : null
	
	detectDeviceType()

	return (
		<D>
			<BannerWrapper>
				<Title>Ultimate Platform for Your Designer Clothing</Title>
				<Content>Start Selling Today</Content>
				<ButtonWrapper>
					<MensWear to='/shop/menswear'>Shop MENSWEAR</MensWear>
					<WomensWear to='/shop/womenswear'>Shop WOMENSWEAR</WomensWear>
				</ButtonWrapper>
			</BannerWrapper>
			<Div>
				{ isMobile ? 
				<BannerImg/>:
				<BannerVideo autoPlay={'autoplay'} muted playsinline loop width='100%'>
					<source  src={video}  type='video/mp4'/>
				</BannerVideo>
				}
			</Div>
		</D>
	)
}