import React, {useEffect, useRef} from 'react'
import styled from 'styled-components'
import {getTrendingItems} from '../WebAPI'
import {parseISO, formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getAllFilteredListing} from '../redux/shopSlice'
import {shopSelector} from '../redux/shopSlice.js'
import {getFilteredListing} from '../WebAPI.js'
import {MEDIA_QUERY_SM, MEDIA_QUERY_MD} from '../breakpoints'


const TrendingSectionWrapper = styled.div `
width:90%;
margin:120px auto;
${MEDIA_QUERY_MD} {
	margin:60px auto;
}
`

const Title = styled.div `
font-size:1.5rem;
font-weight:bold;
`
const ImageWrapper = styled.div `
margin-top:20px;
display:flex;
justify-content:space-between;
align-items:center;
${MEDIA_QUERY_MD} {
	overflow:scroll;
}
`

const Image = styled.div `
background-image:url(${props => props.image && props.image});
width:100%;
height:300px;
background-size:contain;
background-position:center;
background-repeat:no-repeat;
${MEDIA_QUERY_MD} {
	height:20vh;
}
`
const ListDate = styled.div `
font-size:0.6rem;
color:grey;
margin:5px 0px;
`

const ImageCard = styled(Link) `
width:15vw;
font-size:0.7rem;
color:#1C1C1C;
text-decoration:none;
&:hover {
	cursor:pointer;
}
${MEDIA_QUERY_MD} {
	width:20vw;
	margin-top:20px;
	margin-left:30px;
}
`

const HeaderWrapper = styled.div `
width:100%;
display:flex;
justify-content:space-between;
align-items:center;
`

const ListTitle = styled.div `
font-size:0.9rem;
white-space: nowrap;
text-overflow:ellipsis;
width:90%;
overflow:hidden;
${MEDIA_QUERY_MD} {
	font-size:0.6rem;
}
${MEDIA_QUERY_SM} {
	font-size:0.4rem;
}
`

const ListSize = styled.div `
${MEDIA_QUERY_MD} {
	font-size:0.5rem;
	margin:2px 0px;
}
${MEDIA_QUERY_SM} {
	font-size:0.3rem;
	margin:1px 0px;
}
`

const ListContent = styled.div `
text-overflow:ellipsis;
font-size:0.7rem;
overflow:hidden;
margin:5px 0px;
white-space: nowrap;
${MEDIA_QUERY_MD} {
	font-size:0.5rem;
	margin:2px 0px;
}
${MEDIA_QUERY_SM} {
	font-size:0.3rem;
	margin:1px 0px;
}
`

const FooterWrapper = styled.div `
display:flex;
justify-content:space-between;
`

const Price = styled.div ``

const Like = styled.div ``

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
${MEDIA_QUERY_MD} {
	display:none;
}
`

export default function StaffPicksSection () {
	const dispatch = useDispatch()
	const listingRef = useRef([])
	const filterListSelector = useSelector(shopSelector)

	useEffect(() => {
		//Putting in filter condition of staff pick
		listingRef.current.push('StaffPick=true')
		const APIEndPoint = listingRef.current.join('&')

		//get the filtered listings of satff picks
		getFilteredListing(getAllFilteredListing, APIEndPoint, dispatch)

	},[dispatch])


	return (
		<TrendingSectionWrapper>
			<Title>Staff Picks</Title>
			<ImageWrapper>
				{filterListSelector.listing.filter(listing => listing.id < 15).map(item => 
					<ImageCard key={`${item.id}:${item.index}`} to={`/shop/listing/${item.id}`}>
						<StaffPickedIcon>STAFF PICKED</StaffPickedIcon>
						<Image image={item.image_1}/>
						<ListDate>{item.createdAt ? formatDistanceToNow(parseISO(item.createdAt)) : null}</ListDate>
						<HeaderWrapper>
							<ListTitle>{item.itemName}</ListTitle>
							<ListSize>{item.Size ? item.Size.name : null}</ListSize>
						</HeaderWrapper>
						<ListContent>{item.description}</ListContent>
						<FooterWrapper>
							<Price></Price>
							<Like />
						</FooterWrapper>
					</ImageCard>
				)}
			</ImageWrapper>
		</TrendingSectionWrapper>
	)
}