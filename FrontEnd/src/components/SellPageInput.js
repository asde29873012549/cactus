import React from 'react'
import styled from 'styled-components'

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
`

const SectionTitle = styled.div `
font-size:1.5rem;
font-weight:800;
letter-spacing:2px;
color:rgba(0,0,0,0.7);
`



export default function SellPageInput ({change, title, placeholder}) {
	

	return (
		<MoreDetail>
			<SectionTitle>{title}</SectionTitle>
			<Item onChange={change} placeholder={placeholder}/>
		</MoreDetail>
	)
}
