import React, {useEffect, useRef} from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import ListingCard from '../components/ListingCard'
import {useDispatch, useSelector} from 'react-redux'
import {addFilter, removeFilter, clearFilter, getAllFilteredListing} from '../redux/shopSlice'
import FilterSection from '../components/FilterSection'
import {shopSelector} from '../redux/shopSlice.js'
import {getFilteredListing} from '../WebAPI.js'
import {BlackBackground} from '../components/utils'
import AccountForm from '../components/LoginLogout'
import {accountSelector, openLoginForm} from '../redux/accountSlice'

const ShopContentWrapper = styled.div `
width:80%;
margin:30px auto;
display:flex;
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
`

const Hr = styled.div `
height:1px;
width:80%;
background-color:#BDC0BA;
margin:0 auto;
`

export default function Shop () {
	const dispatch = useDispatch()
	const listingRef = useRef([])
	const filterListSelector = useSelector(shopSelector)
	const account = useSelector(accountSelector)

	useEffect(() => {
		//Putting in filter condition of staff pick
		listingRef.current.push('StaffPick=true')
		const APIEndPoint = listingRef.current.join('&')

		//get the filtered listings of satff picks
		getFilteredListing(getAllFilteredListing, APIEndPoint, dispatch)

		return(
			function () {
				dispatch(clearFilter())
			}
		)
	},[dispatch])


	//Handle ChackBox clicks
	const onCheckboxChange = (e, target) => {

		//retrieve your filter's name and id
		const filterTargetId = Object.entries(target)[0][1]
		const filterTarget = Object.keys(target)[0]

		if (e.target.checked) {
			//if filter added
			dispatch(addFilter(e.target.value))
			listingRef.current.push(`${filterTarget}=${filterTargetId}`)	
		} else {
			//if filter removed
			for (let i = 0 ; i < listingRef.current.length ; i++) {
				dispatch(removeFilter(e.target.value))
				if (listingRef.current[i] === `${filterTarget}=${filterTargetId}`) {
					listingRef.current.splice(i, 1)
				}
			}
		}
		
		//make API calls to get filtered lisitngs
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
			<FilterSection />
			{filterListSelector.filter.length > 0 ? <Hr /> : null}
			<ShopContentWrapper>
				<SidebarWrapper>
					<Sidebar onCheckboxChange={onCheckboxChange}/>
				</SidebarWrapper>
				<ListingWrapper>
					<Listings>
						{filterListSelector.listing.map(listing => <ListingCard key={listing.id} id={listing.id}>{listing}</ListingCard>)}
					</Listings>
				</ListingWrapper>
			</ShopContentWrapper>
		</>
	)
}