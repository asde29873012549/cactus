import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {getUserItems} from '../WebAPI'
import heart from './static/heart.png'
import {MEDIA_QUERY_SM, MEDIA_QUERY_MD} from '../breakpoints'


const Header = styled.div `
border:1px solid rgba(210, 210, 210, 0.8);
width:80%;
height:60px;
text-align:center;
line-height:60px;
font-size:1.2rem;
font-weight:900;
color:grey;
margin:0 auto;
box-sizing:border-box;
${MEDIA_QUERY_MD} {
	width:100%;
}
${MEDIA_QUERY_SM} {
	width:100%;
}
`

const Items = styled.div `
border-bottom:1px solid rgba(210, 210, 210, 0.8);
border-right:1px solid rgba(210, 210, 210, 0.8);
border-left:1px solid rgba(210, 210, 210, 0.8);
border-List:1px solid rgba(210, 210, 210, 0.8);
display:flex;
align-items:center;
font-size:0.9rem;
padding:20px 20px;
width:80%;
margin:0 auto;
box-sizing:border-box;
${MEDIA_QUERY_MD} {
	font-size:0.6rem;
	width:100%;
	flex-direction:column;
}
${MEDIA_QUERY_SM} {
	font-size:0.6rem;
	width:100%;
	flex-direction:column;
}
`

const ItemImage = styled.div `
background-image:url(${props => props.image ? props.image : null});
background-size:contain;
background-repeat:no-repeat;
background-position:center;
width:100px;
height:100px;
margin-right:30px;
border-radius:50%;
border:1px solid transparent;
&:hover {
	cursor:pointer;
}
${MEDIA_QUERY_MD} {
	margin-right:0;
}
${MEDIA_QUERY_SM} {
	margin-right:0;
}
`

const List = styled.div `
display:flex;
align-items:center;
justify-content:center;
position:relative;
height:150px;
${MEDIA_QUERY_MD} {
	flex-direction:column;
}
${MEDIA_QUERY_SM} {
	flex-direction:column;
}
`

const ItemName = styled.div `
font-weight:900;
width:200px;
margin-right:30px;
color:rgb(80, 80, 80);
&:hover {
	cursor:pointer;
}
${MEDIA_QUERY_MD} {
	margin-right:0;
	text-align:center;
}
${MEDIA_QUERY_SM} {
	margin-right:0;
	text-align:center;
}
`

const ItemDescription = styled.pre `
font-size:0.8rem;
width:300px;
margin-right:30px;
color:grey;
font-family:YuGothic;
${MEDIA_QUERY_MD} {
	font-size:0.6rem;
	text-align:center;
	margin-right:0;
}
${MEDIA_QUERY_SM} {
	font-size:0.6rem;
	text-align:center;
	margin-right:0;
}
`

const ItemPrice = styled.div `
font-size:0.8rem;
color:grey;
margin-right:20px;
&:before {
	content:'$';
}

`

const RightPart = styled.div `
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`

const PriceSection = styled.div `
display:flex;
align-items:center;
`

const EditBtn = styled.button `
text-align:center;
line-height:25px;
width:150px;
background-color:#1C1C1C;
border-radius:5px;
border:1px solid #1C1C1C;
color:white;
font-size:0.8rem;
box-sizing:border-box;
position:absolute;
margin-left:670px;
margin-top:150px;
&:hover {
	cursor:pointer;
	background-color:white;
	color:#1C1C1C;
	border:1px solid #1C1C1C;
}
`

const Like = styled.div `
font-size:0.7rem;
background-image:url(${heart});
background-position:center;
background-size:cover;
width:15px;
height:15px;
`

const Likecount = styled.div `
font-size:0.7rem;
margin-left:5px;
`

const ItemSize = styled.div `
font-size:0.8rem;
color:rgb(110, 110, 110);
margin-top:5px;
font-weight:800;
`

const Left = styled.div `
display:flex;
flex-direction:column;
${MEDIA_QUERY_MD} {
	justify-content:center;
	align-items:center;
}
${MEDIA_QUERY_SM} {
	justify-content:center;
	align-items:center;
}
`

export default function MeItems () {
	const [userItems, setUserItems] = useState([{}])
	
	useEffect(() => {
		getUserItems(localStorage.getItem('userId'), setUserItems)
	},[])


	return (
		<>
			<Header>YOUR LISTINGS</Header>
			{ userItems.map(item =>
			<Items key={`${item.id}:${item.index}`}>
				<ItemImage image={item.image_1}/>
				<List>
					<Left>
						<ItemName >{item.itemName}</ItemName>
						<ItemSize>{item.Size ? item.Size.name : null}</ItemSize>
					</Left>
					<ItemDescription>{item.description}</ItemDescription>
					<RightPart>
						<PriceSection>
							<ItemPrice>{item.price}</ItemPrice>
							<Like/>
							<Likecount>{item.Like ? (item.Like.likes > 0 ? item.Like.likes : null) : null}</Likecount>
						</PriceSection>
					</RightPart>
				</List>
				<EditBtn>EDIT LISTING</EditBtn>
			</Items>
			)}
		</>
	)
}
