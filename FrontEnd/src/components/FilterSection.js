import React, { useEffect } from 'react'
import styled from 'styled-components'
import {shopSelector, clearFilter} from '../redux/shopSlice.js'
import {useSelector, useDispatch} from 'react-redux'

const FilterSectionWrapper = styled.div `
display:flex;
justify-content:center;
align-items:center;
flex-wrap: wrap;
width:80%;
margin:0 auto;
`

const FilterItem = styled.div `
width:auto;
padding:0 10px;
height:30px;
border-radius:6px;
border:1.2px solid #1C1C1C;
margin:10px;
text-align:center;
line-height:30px;
font-size:0.8rem;
`

export default function FilterSection () {
	const filterListSelector = useSelector(shopSelector)
	const dispatch = useDispatch()

	useEffect(() => {
		return () => dispatch(clearFilter())
	}, [dispatch])

	return (
		<FilterSectionWrapper>
			{filterListSelector.filter.map(filterItem => <FilterItem key={filterItem}>{filterItem}</FilterItem>)}
		</FilterSectionWrapper>
	)
}