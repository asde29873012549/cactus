import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {getDesigner} from '../WebAPI'
import {Link} from 'react-router-dom'
import {MEDIA_QUERY_SM, MEDIA_QUERY_MD} from '../breakpoints'

const Title = styled.div `
font-weight:bold;
margin:60px 0px;
font-size:1.5rem;
${MEDIA_QUERY_MD} {
	font-size:1.3rem;
	margin:20px 0px;
}
${MEDIA_QUERY_SM} {
	font-size:1rem;
}
`

const BrandWrapper = styled.div `
width:90vw;
display:flex;
justify-content:space-between;
${MEDIA_QUERY_MD} {
	display:block;
	overflow:scroll;
	white-space:nowrap;
}
${MEDIA_QUERY_SM} {
	overflow:scroll;
	white-space:nowrap;
}
`

const PopularDesignerSectionWrapper = styled.div `
width:90%;
margin:60px auto;
display:flex;
flex-direction:column;
${MEDIA_QUERY_MD} {
	margin:30px auto;
}
`
const Brand = styled(Link) `
border-radius:50%;
width:190px;
height:190px;
border:1px solid rgb(230, 230, 230);
background-image:url(${props => props.image && props.image});
background-position:center;
background-size:contain;
background-repeat:no-repeat;
${MEDIA_QUERY_MD} {
	display:inline-block;
	width:80px;
	height:80px;
	&+& {
		margin-left:10px;
	}
}
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
				{popularDesigners.filter(designer => designer.id < 7).map(designer => <Brand to={`/shop/designerListing/${designer.id}`} image={designer.logo} key={designer.name}/>)}
				</BrandWrapper>
			</PopularDesignerSectionWrapper>
		</>
	)
}