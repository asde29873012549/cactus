import React, {useEffect, useState, useRef} from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import ListingCard from '../components/ListingCard'
import {useDispatch, useSelector} from 'react-redux'
import {addFilter, removeFilter, clearFilter} from '../redux/shopSlice'
import FilterSection from '../components/FilterSection'
import {shopSelector} from '../redux/shopSlice.js'
import {getListing, getFilteredListing} from '../WebAPI.js'
import {BlackBackground} from '../components/utils'
import AccountForm from '../components/LoginLogout'
import {accountSelector, openLoginForm} from '../redux/accountSlice'
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

export default function Shop () {
	const dispatch = useDispatch()
	const [listing, setListing] = useState([])
	const listingRef = useRef([])
	const filterListSelector = useSelector(shopSelector)
	const account = useSelector(accountSelector)

	useEffect(() => {
		//get All the listings
		getListing(localStorage.getItem('userId'), setListing)

		return(
			function () {
				dispatch(clearFilter())
			}
		)
	},[dispatch])


	//Handle cheackbox click
	const onCheckboxChange = (e, target) => {
		const filterTargetId = Object.entries(target)[0][1]
		const filterTarget = Object.keys(target)[0]

		if (e.target.checked) {
			//add filter
			dispatch(addFilter(e.target.value))
			listingRef.current.push(`${filterTarget}=${filterTargetId}`)	
		} else {
			//remove filter
			for (let i = 0 ; i < listingRef.current.length ; i++) {
				dispatch(removeFilter(e.target.value))
				if (listingRef.current[i] === `${filterTarget}=${filterTargetId}`) {
					listingRef.current.splice(i, 1)
				}
			}
		}
		
		//make API calls
		const APIEndPoint = listingRef.current.join('&');
		getFilteredListing(setListing, APIEndPoint)
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
			<FilterSection />
			{filterListSelector.filter.length > 0 ? <Hr /> : null}
			<ShopContentWrapper>
				<SidebarWrapper>
					<Sidebar onCheckboxChange={onCheckboxChange}/>
				</SidebarWrapper>
				<ListingWrapper>
					<Listings>
						{listing.map(listing => <ListingCard key={listing.id} id={listing.id}>{listing}</ListingCard>)}
					</Listings>
				</ListingWrapper>
			</ShopContentWrapper>
		</>
	)
}