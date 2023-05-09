import React, {useEffect, useRef} from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import {useSelector, useDispatch} from 'react-redux'
import {shopSelector} from '../redux/shopSlice'
import ListingCard from '../components/ListingCard'
import {addFilter, removeFilter, getAllFilteredListing} from '../redux/shopSlice'
import {getFilteredListing} from '../WebAPI.js'
import {useParams, useLocation} from 'react-router'
import FilterSection from '../components/FilterSection'
import AccountForm from '../components/LoginLogout'
import {accountSelector, openLoginForm} from '../redux/accountSlice'
import {BlackBackground} from '../components/utils'
import {MEDIA_QUERY_SM, MEDIA_QUERY_MD} from '../breakpoints'

const ShopContentWrapper = styled.div `
width:80%;
margin:30px auto;
display:flex;
${MEDIA_QUERY_MD} {
	width:90%;
}
${MEDIA_QUERY_SM} {
	width:95%;
}
`
const SidebarWrapper = styled.div `
width:25%;
${MEDIA_QUERY_MD} {
	width:40%;
}
${MEDIA_QUERY_SM} {
	width:40%;
}
`

const ListingWrapper = styled.div `
width:100%;
`

const Listings = styled.div `
margin:0 auto;
width:890px;
${MEDIA_QUERY_MD} {
	width:75vw;
}
${MEDIA_QUERY_SM} {
	width:90vw;
}
`

const Hr = styled.div `
height:1px;
width:80%;
background-color:#BDC0BA;
margin:0 auto;
`


export default function PerCategoryPage () {
	const filteredListingSelector = useSelector(shopSelector)
	const listing = filteredListingSelector.listing
	const dispatch = useDispatch()
	const listingRef = useRef([])
	const {id} = useParams()
	const url = useLocation().pathname
	const category= url.split('/')[3].split('Listing')[0]
	const account = useSelector(accountSelector)

	useEffect(() => {
		listingRef.current.push(`${category}=${id}`)
		const APIEndPoint = listingRef.current.join('&')
		getFilteredListing(getAllFilteredListing, APIEndPoint, dispatch)

		return () => {
			dispatch(getAllFilteredListing([]))
			const index = listingRef.current.indexOf(`${category}=${id}`)
			index >= 0 && listingRef.current.splice(index, 1)
		}
	}, [category, dispatch, id])

	const onCheckboxChange = (e, target) => {
		const filterTargetId = Object.entries(target)[0][1]
		const filterTarget = Object.keys(target)[0]

		if (e.target.checked) {
			dispatch(addFilter(e.target.value))
			listingRef.current.push(`${filterTarget}=${filterTargetId}`)	
		} else {
			for (let i = 0 ; i < listingRef.current.length ; i++) {
				dispatch(removeFilter(e.target.value))
				if (listingRef.current[i] === `${filterTarget}=${filterTargetId}`) {
					listingRef.current.splice(i, 1)
				}
			}
		}
		
		const APIEndPoint = listingRef.current.join('&')
		getFilteredListing(getAllFilteredListing, APIEndPoint, dispatch)
	}

	const onBackgroundClick = () => {
		dispatch(openLoginForm(true))
	}
	

	return (
		<>
			{account.isLoginFormOpen ? <BlackBackground onBackgroundClick={onBackgroundClick}/> : null}
			<AccountForm />
			<Header />
			<Navbar />
			{console.log(listing)}
			<FilterSection />
			{filteredListingSelector.filter.length > 0 ? <Hr /> : null}
			<ShopContentWrapper>
				<SidebarWrapper>
					<Sidebar onCheckboxChange={onCheckboxChange}/>
				</SidebarWrapper>
				<ListingWrapper>
					<Listings>
						{listing.map(listing => <ListingCard key={`${listing.id}:${listing.index}`} id={listing.id}>{listing}</ListingCard>)}
					</Listings>
				</ListingWrapper>
			</ShopContentWrapper>
		</>
	)
}

/*
<WhichCategorySection>{`${department}'s section`}</WhichCategorySection>
<Hr />
*/