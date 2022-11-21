import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {getDesigner} from '../WebAPI'

const Title = styled.div `
font-weight:bold;
margin:60px 0px;
font-size:1.5rem;
`

const BrandWrapper = styled.div `
display:flex;
justify-content:space-between;
`

const PopularDesignerSectionWrapper = styled.div `
width:90%;
margin:60px auto;
display:flex;
flex-direction:column;
`
const Brand = styled.div `
border-radius:50%;
width:190px;
height:190px;
border:1px solid rgb(230, 230, 230);
background-image:url(${props => props.image && props.image});
background-position:center;
background-size:contain;
background-repeat:no-repeat;
`


export default function PopularDesignerSection () {
	const [popularDesigners, setPopularDesigners] = useState([])

	useEffect(() => {
		getDesigner(setPopularDesigners)
	}, [])

	return (
		<>
			<PopularDesignerSectionWrapper>
				<Title>Popular Designer</Title>
				<BrandWrapper>
				{popularDesigners.filter(designer => designer.id < 7).map(designer => <Brand image={designer.logo} key={designer.name}/>)}
				</BrandWrapper>
			</PopularDesignerSectionWrapper>
		</>
	)
}