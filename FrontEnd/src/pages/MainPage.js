import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Banner from '../components/Banner'
import TrendingSection from '../components/TrendingSection'
import PopularDesignerSection from '../components/PopularDesignerSection'
import StaffPicksSection from '../components/StaffPicksSection'
import Footer from '../components/Footer'
import AccountForm from '../components/LoginLogout'
import {accountSelector, openLoginForm} from '../redux/accountSlice'
import {useSelector, useDispatch} from 'react-redux'
import {BlackBackground} from '../components/utils'


export default function Main () {
	const account = useSelector(accountSelector)
	const dispatch = useDispatch()

	const onBackgroundClick = () => {
		dispatch(openLoginForm(true))
	}

	return (
		<>
			{account.isLoginFormOpen ? <BlackBackground onBackgroundClick={onBackgroundClick}/> : null}
			<AccountForm />
			<Header />
			<Navbar />
			<Banner />
			<TrendingSection />
			<PopularDesignerSection />
			<StaffPicksSection />
			<Footer />
		</>
		
	)
}