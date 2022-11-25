import React from 'react'
import styled from 'styled-components'
import {removeFromCart, getUserShoppingCart} from '../WebAPI'
import {MEDIA_QUERY_SM, MEDIA_QUERY_MD} from '../breakpoints'


const Item = styled.div `
width:100%;
height:140px;
border-top:1px solid rgb(200, 200, 200);
border-bottom:1px solid rgb(200, 200, 200);
font-size:0.9rem;
display:flex;
align-items:center;
justify-content:space-between;
position:relative;
`

const ItemImage = styled.div `
width:70px;
height:100px;
background-image:url(${props => props.image ? props.image : null});
background-position:center;
background-size:contain;
background-repeat:no-repeat;
`

const ItemDescription = styled.div `
display:flex;
flex-direction:column;
margin-left:40px;
`

const Title = styled.div `
font-weight:800;
`

const Size = styled.div `
color:grey;
`

const ItemPrice = styled.div  `
&::before {
	content:'$'
}
` 

const Div = styled.div `
display:flex;
align-items:center;
`

const Seller = styled.div `
font-size:0.8rem;
margin-top:40px;
`
const RemovefromCart = styled.div `
font-size:0.7rem;
margin-left:86%;
margin-top:15%;
text-decoration:underline;
color:#1C1C1C;
position:absolute;
&:hover {
	cursor:pointer;
}
${MEDIA_QUERY_MD} {
	font-size:0.3rem;
	margin-top:30%;
}
${MEDIA_QUERY_SM} {
	font-size:0.3rem;
	margin-top:30%;
}
`

export default function SingleOrderSection ({listing, setter}) {

	//remove listing from your shopping cart
	const onRemoveFromCart = () => {
		async function retrieve () {
			//make remove api calls
			await removeFromCart(listing.ListingId, localStorage.getItem('userId'))
			//get shopping cart data again
			await getUserShoppingCart(localStorage.getItem('userId'), setter)
		}
		retrieve()
	}
	
	return (
		<Item>
			<RemovefromCart onClick={onRemoveFromCart}>Remove from Cart</RemovefromCart>
			<Div>
				<ItemImage image={listing.image_1}/>
				<ItemDescription>
					<Title>{listing.itemName}</Title>
					<Size>{listing.sizeName}</Size>
					<Seller>Seller : {listing.sellerName}</Seller>
				</ItemDescription>
			</Div>
			<ItemPrice>{listing.price}</ItemPrice>
		</Item>	
	)
}