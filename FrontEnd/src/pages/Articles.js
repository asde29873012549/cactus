import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import ArticleBigImageCard from '../components/ArticleBigImageCard'
import ArticleMediumImageCard from '../components/ArticleMediumImageCard'
import ArticleTinyImageCard from '../components/ArticleTinyImageCard'
import ArticleMagWrapper from '../components/ArticleMagWrapper'
import {BlackBackground} from '../components/utils'
import AccountForm from '../components/LoginLogout'
import {accountSelector, openLoginForm} from '../redux/accountSlice'
import {useSelector, useDispatch} from 'react-redux'

const ImageSection = styled.div `
width:86%;
margin:30px auto;
display:flex;
align-items:center;
justify-content:space-between;
&+& {
	margin-top:60px;
}
`

export default function Articles () {
	const account = useSelector(accountSelector)
	const dispatch = useDispatch()

	const onBackgroundClick = () => {
		dispatch(openLoginForm(true))
	}

	return (
		<>
		{account.isLoginFormOpen ? <BlackBackground onBackgroundClick={onBackgroundClick}/> : null}
		<AccountForm />
		<Header/>
		<Navbar/>
		<ImageSection>
			<ArticleBigImageCard/>
			<ArticleBigImageCard/>
		</ImageSection>
		<ImageSection>
			<ArticleMediumImageCard/>
			<ArticleMediumImageCard/>
			<ArticleMediumImageCard/>
		</ImageSection>
		<ImageSection>
			<ArticleBigImageCard/>
			<ArticleBigImageCard/>
		</ImageSection>
		<ImageSection>
			<ArticleTinyImageCard/>
			<ArticleTinyImageCard/>
			<ArticleTinyImageCard/>
			<ArticleTinyImageCard/>
		</ImageSection>
		<ImageSection>
			<ArticleMagWrapper/>
		</ImageSection>
		<ImageSection>
		<ArticleMediumImageCard/>
			<ArticleMediumImageCard/>
			<ArticleMediumImageCard/>
		</ImageSection>
		
		</>
		
	)
}