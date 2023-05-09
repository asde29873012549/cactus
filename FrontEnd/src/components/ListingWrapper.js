import React from 'react'
import styled from 'styled-components'
import heart from '../components/static/heart.png'
import Redheart from '../components/static/Redheart.png'
import {MEDIA_QUERY_SM, MEDIA_QUERY_MD} from '../breakpoints'


const Wrapper = styled.div `
display:flex;
width:90%;
justify-content:center;
margin:20px auto;
${MEDIA_QUERY_MD} {
	flex-direction:column;
	margin:0 auto;
}
${MEDIA_QUERY_SM} {
	flex-direction:column;
	margin:0 auto;
}
`

const LeftInfoSection = styled.div `
width:25%;
display:flex;
justify-content:center;
align-items:flex-start;
height:100vh;
flex-direction:column;
font-size:1rem;
${MEDIA_QUERY_MD} {
	width:90%;
	align-items:center;
	height:auto;
	margin:30px auto;
}
${MEDIA_QUERY_SM} {
	width:90%;
	align-items:center;
	height:auto;
	margin:30px auto;
}
`

const ImageSection = styled.div `
width:50%;
overflow:scroll;
height:100vh;

::-webkit-scrollbar {
    display: none;
}
${MEDIA_QUERY_MD} {
	width:90%;
	height:70vh;
	margin:0 auto;
}
${MEDIA_QUERY_SM} {
	width:90%;
	height:70vh;
	margin:0 auto;
}
`

const Image = styled.div `
width:400px;
height:540px;
background-image:url(${props => props.image ? props.image : null});
background-size:contain;
background-position:center;
background-repeat:no-repeat;
margin:0 auto;
&+& {
	margin-top:30px;
}
${MEDIA_QUERY_MD} {
	width:95%;
}
${MEDIA_QUERY_SM} {
	width:95%;
}
`

const RightInfoSection = styled.div `
width:25%;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
${MEDIA_QUERY_MD} {
	width:90%;
	margin:30px auto;
}
${MEDIA_QUERY_SM} {
	width:90%;
	margin:20px auto;
}

`

const ListingBrand = styled.div `
font-weight:500;
margin-bottom:20px;
font-size:1.2rem;

`

const ListingItemName = styled.div `
font-weight:900;

`

const ListingDescription = styled.div `
font-size:0.8rem;
width:90%;
white-space:pre-wrap;
margin-top:15px;
${MEDIA_QUERY_MD} {
	text-align:center;
}
${MEDIA_QUERY_SM} {
	text-align:center;
}
`


const ListingCondition = styled.div `
font-size:1rem;
margin-bottom:20px;
`

const ListingPrice = styled.div `
font-size:0.9rem;

&:before {
	content:'$';
}
`

const Warning = styled.div `
font-size:0.5rem;
color:grey;
`

const ListingBtn = styled.div `
width:160px;
height:45px;
line-height:45px;
text-align:center;
border-radius:5px;
border:1.5px solid #1C1C1C;
background-color:#1C1C1C;
color:white;
font-weight:900;
font-size:0.8rem;
margin-top:20px;
& + & {
	margin:8px 0;
}
transition:all 0.3s ease-in;
&:hover {
	cursor:pointer;
	background-color:white;
	color:#1C1C1C;
}
`

const Like = styled.div `
background-image:url(${heart});
background-position:center;
background-size:cover;
width:20px;
height:20px;
margin-top:10px;
&:hover {
	cursor:pointer;
}
`

const Liked = styled.div `
background-image:url(${Redheart});
background-position:center;
background-size:cover;
width:20px;
height:20px;
&:hover {
	cursor:pointer;
}
`

//Wrapping listing info needed in an array
const listingInfoNeeded = ['color', 'description', 'sizeName']

export default function ListingWrapper ({listingInfo, listingImage, onMessage, onLike, onAddToCart, isLiked}) {

	return (
			<Wrapper>
				<LeftInfoSection>
					<ListingBrand>{listingInfo.designerName}</ListingBrand>
					<ListingItemName>{listingInfo.itemName}</ListingItemName>
					{listingInfoNeeded.map(lisitngInfo => <ListingDescription key={lisitngInfo}>{listingInfo[lisitngInfo]}</ListingDescription>)}
				</LeftInfoSection>
				<ImageSection>
					{listingImage
					.filter(image => image[1] !== null)
					.map(image => <Image key={image[0]} image={image[1]}/>)
					}
				</ImageSection>
				<RightInfoSection>
					<ListingCondition>{listingInfo.conditionName}</ListingCondition>
					<ListingPrice>{listingInfo.price}</ListingPrice>
					<Warning>Shipping fees will be calculated upon checkout.</Warning>
					<ListingBtn onClick={onAddToCart}>ADD TO CART</ListingBtn>
					<ListingBtn onClick={onMessage}>MESSAGE SELLER</ListingBtn>
					{isLiked ? <Liked onClick={onLike}/> : <Like onClick={onLike}/>}
				</RightInfoSection>
			</Wrapper>
	)
}