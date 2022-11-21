import React, {useState} from 'react'
import styled from 'styled-components'
import {parseISO, formatDistanceToNow} from 'date-fns'
import heart from './static/heart.png'
import Redheart from './static/Redheart.png'
import {Link} from 'react-router-dom'
import {likePressed} from '../redux/shopSlice'
import {useDispatch} from 'react-redux'
import {likeAListing} from '../WebAPI'

const CardWrapper = styled.div `
display:inline-block;
margin:10px 10px;
width:200px;
`

const CardImage = styled.div `
background-image:url(${props => props.image ? props.image : null});
background-size:contain;
width:100%;
height:250px;
background-position:center;
background-repeat:no-repeat;
`

const CardLink = styled(Link) ``

const ListingTime = styled.div `
font-size:0.7rem;
color:grey;
margin:5px 0;
`

const Hr = styled.div `
width:100%;
height:1px;
background-color:grey;
`

const ListingTitleWrapper = styled(Link) `
display:flex;
justify-content:space-between;
margin:5px 0;
text-decoration:none;
color:#1C1C1C;
`

const ListingTitle = styled.div `
font-size:0.8rem;
font-weight:900;
text-overflow:ellipsis;
overflow:hidden;
white-space: nowrap;
`

const ListingSize = styled.div `
font-size:0.8rem;
font-weight:900;
`
const ListingContent = styled.div `
font-size:0.7rem;
text-overflow:ellipsis;
overflow:hidden;
white-space: nowrap;
`


const ListingFooterWrapper = styled.div `
display:flex;
justify-content:space-between;
margin:5px 0;
`

const ListingPrice = styled.div `
font-size:0.8rem;
font-weight:900;
&:before {
	content:'$';
}
`

const Heart = styled.div `
font-size:0.7rem;
background-image:url(${heart});
background-position:center;
background-size:cover;
width:15px;
height:15px;
&:hover {
	cursor:pointer;
}
`

const RedHeart = styled(Heart) `
background-image:url(${Redheart});
`

const StaffPickedIcon = styled.div `
position:absolute;
margin-left:5px;
margin-top:5px;
background-color:#1C1C1C;
border-radius:20px;
width:60px;
height:20px;
font-size:0.4rem;
font-weight:800;
color:white;
line-height:20px;
text-align:center;
`

export default function ListingCard ({children, id}) {
	const dispatch = useDispatch()
	const [isLiked, setIsLiked] = useState(false)

	//Handle like listing
	const onLike = () => {
		likeAListing(id, localStorage.getItem('userId'), setIsLiked, isLiked)
		dispatch(likePressed())
	}

	return (
		<CardWrapper>
			{children.StaffPick ? <StaffPickedIcon>STAFF PICKED</StaffPickedIcon> : null}
			<CardLink to={`/shop/listing/${id}`}><CardImage image={children.image_1} to={`/shop/listing/${id}`}></CardImage></CardLink>
			<ListingTime>{formatDistanceToNow(parseISO(children.createdAt))}</ListingTime>
			<Hr/>
			<ListingTitleWrapper to={`/shop/listing/${id}`}>
				<ListingTitle>{children.itemName}</ListingTitle>
				<ListingSize>{children.Size ? children.Size.name : null}</ListingSize>
			</ListingTitleWrapper>
			<ListingContent>{children.description}</ListingContent>
			<ListingFooterWrapper>
				<ListingPrice>{children.price}</ListingPrice>
				{isLiked ? <RedHeart onClick={onLike}/> : (children.FavoriteItems ? (children.FavoriteItems.length > 0 ? <RedHeart onClick={onLike}/> : <Heart onClick={onLike}/>) : <Heart onClick={onLike}/>)}
			</ListingFooterWrapper>
		</CardWrapper>
	)
}


//{isLiked ? <RedHeart onClick={onLike}/> : (children.FavoriteItems ? (children.FavoriteItems.length > 0 ? <RedHeart onClick={onLike}/> : <Heart onClick={onLike}/>) : <Heart onClick={onLike}/>)}