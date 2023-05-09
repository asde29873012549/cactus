import React from 'react'
import styled from 'styled-components'
import ArticleTinyImageCard from '../components/ArticleTinyImageCard'

const LeftImagePart = styled.div `
height:600px;
display:flex;
flex-direction:column;
justify-content:space-between;
`

const RightImagePart = styled.div `
width:280px;
`

const SmallImage = styled.div `
width:420px;
height:280px;
background-image:url('https://res.cloudinary.com/ssenseweb/image/upload/w_768,q_90,f_auto,dpr_auto/v1667397617/afzrg9qecta1wgm1zff0.jpg');
background-position:center;
background-size:center;
`

const SmallImageInfo = styled.div `
width:350px;
height:300px;
display:flex;
flex-direction:column;
margin-left:30px;
`

const SmallTitle = styled.div `
font-size:0.9rem;
font-weight:900;
`
const SmallContent = styled.div `
font-size:0.9rem;
`

const Div = styled.div `
display:flex;
`

const TinyImageWrapperBigger = styled(ArticleTinyImageCard) `
height:90px;
&+& {
	border-top:0;
}
`

export default function ArticleMagWrapper () {
	return (
		<>
			<LeftImagePart>
				<Div>
					<SmallImage/>
					<SmallImageInfo>
						<SmallTitle>THE 1XBLUE MINDSET</SmallTitle>
						<SmallContent>From the Tennis Courts to the Club, London-Based Designer Lois Saunders Has Big Plans for the Future</SmallContent>
					</SmallImageInfo>
				</Div>
				<Div>
					<SmallImage/>
					<SmallImageInfo>
						<SmallTitle>THE 1XBLUE MINDSET</SmallTitle>
						<SmallContent>From the Tennis Courts to the Club, London-Based Designer Lois Saunders Has Big Plans for the Future</SmallContent>
					</SmallImageInfo>
				</Div>
			</LeftImagePart>
			<RightImagePart>
				< TinyImageWrapperBigger/>
				< TinyImageWrapperBigger/>
				< TinyImageWrapperBigger/>
				< TinyImageWrapperBigger/>
				< TinyImageWrapperBigger/>
			</RightImagePart>
		</>
	)
}