import React from 'react'
import styled from 'styled-components'
import {MEDIA_QUERY_SM, MEDIA_QUERY_MD} from '../breakpoints'

const MoreDetail = styled.div ``

const Item = styled.input `
width:360px;
height:40px;
border:1px solid grey;
color:grey;
border-radius:6px;
margin-top:30px;
box-sizing:border-box;
padding:0 10px;
${MEDIA_QUERY_MD} {
	max-width:350px;
	height:40px;
}
${MEDIA_QUERY_SM} {
	max-width:300px;
	height:40px;
}
`

const SectionTitle = styled.div `
font-size:1.5rem;
font-weight:800;
letter-spacing:2px;
color:rgba(0,0,0,0.7);
${MEDIA_QUERY_MD} {
	font-size:1rem;
}
${MEDIA_QUERY_SM} {
	font-size:0.9rem;
}
`




export default function SellPageInput ({change, title, placeholder}) {
	

	return (
		<MoreDetail>
			<SectionTitle>{title}</SectionTitle>
			<Item onChange={change} placeholder={placeholder}/>
		</MoreDetail>
	)
}
