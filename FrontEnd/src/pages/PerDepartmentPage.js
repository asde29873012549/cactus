import React, {useEffect, useState, useRef} from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import {useSelector, useDispatch} from 'react-redux'
import {shopSelector} from '../redux/shopSlice'
import ListingCard from '../components/ListingCard'
import {addFilter, removeFilter, getAllFilteredListing} from '../redux/shopSlice'
import {getFilteredListing} from '../WebAPI.js'
import {useLocation} from 'react-router'
import FilterSection from '../components/FilterSection'
import {ConvertToCapital} from '../components/utils'
import {BlackBackground} from '../components/utils'
import AccountForm from '../components/LoginLogout'
import {accountSelector, openLoginForm} from '../redux/accountSlice'
import {MEDIA_QUERY_SM, MEDIA_QUERY_MD} from '../breakpoints'
import MobileRefineSection from '../components/MobileRefineSection'

const ShopContentWrapper = styled.div `
width:80%;
margin:30px auto;
display:flex;
${MEDIA_QUERY_MD} {
	width:90%;
	${props => props.mobileActive&&'overflow:hidden'};
	${props => props.mobileActive&&'position:fixed'};
}
${MEDIA_QUERY_SM} {
	width:95%;
	${props => props.mobileActive&&'overflow:hidden'};
	${props => props.mobileActive&&'position:fixed'};
}
`
const SidebarWrapper = styled.div `
width:25%;
transition:all 0.5s ease-in-out;
${MEDIA_QUERY_SM} {
	display:block;
	position:fixed;
	margin:0 auto;
	width:${props => props.mobileActive ? '95vw' : '0vw'};
	background-color:white;
	z-index:1;
	opacity:${props => props.mobileActive ? '1' : '0'};
	overflow-y:scroll;
	inset:0;
	margin-top:70px;
	z-index:3;
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
	margin-bottom:60px;
}
${MEDIA_QUERY_SM} {
	width:90vw;
	margin-bottom:60px;
}
`

const Hr = styled.div `
height:1px;
width:80%;
background-color:#BDC0BA;
margin:0 auto;
`

const ShopTitle = styled.div `
font-size:1.6rem;
width:80%;
margin:30px auto;
font-weight:900;
`

export default function PerDepartmentPage () {
	const filteredListingSelector = useSelector(shopSelector)
	const listing = filteredListingSelector.listing
	const dispatch = useDispatch()
	const listingRef = useRef([])
	const url = useLocation().pathname
	const department= url.split('/')[2]
	const account = useSelector(accountSelector)

	useEffect(() => {
		listingRef.current.push(`department=${department === 'menswear' ? 1 : 2}`)
		const APIEndPoint = listingRef.current.join('&')
		getFilteredListing(getAllFilteredListing, APIEndPoint, dispatch)
	}, [department, dispatch])

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
			<MobileRefineSection/>
			{console.log(department)}
			<ShopTitle>{`Shop ${ConvertToCapital(department)}`}</ShopTitle>
			<FilterSection />
			{filteredListingSelector.filter.length > 0 ? <Hr /> : null}
			<ShopContentWrapper mobileActive={filteredListingSelector.mobileCategorySectionActive}>
				<SidebarWrapper mobileActive={filteredListingSelector.mobileCategorySectionActive}>
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