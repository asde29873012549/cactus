import React from 'react'
import styled from 'styled-components'

const TinyImageWrapper = styled.div `
border-top:1px solid black;
border-bottom:1px solid black;
padding:10px 0;
font-size:0.9rem;
height:90px;
width:280px;
display:flex;
`

const Title = styled.div `
font-weight:900;
`

const TinyTitle = styled(Title) `
font-size:0.6rem;
`

const TinyImage = styled.div `
background-image:url('https://res.cloudinary.com/ssenseweb/image/upload/w_480,q_90,f_auto,dpr_auto/v1662729938/ergnjjf7wh3uzlqyz8nm.jpg');
background-size:cover;
background-position:center;
width:60px;
height:90px;
margin-right:20px;
`

const TinyImageInfo = styled.div `
display:flex;
flex-direction:column;
justify-content:space-between;
align-items:center;
width:200px;
`

export default function ArticleTinyImageCard ({className}) {
	return (
		<div>
			<TinyImageWrapper className={className}>
				<TinyImage/>
				<TinyImageInfo>
					<TinyTitle>EXPLODING CLAY WITH NATHALEE PAOLINELLI</TinyTitle>
					<TinyTitle>EXPLODING CLAY WITH NATHALEE PAOLINELLI</TinyTitle>
				</TinyImageInfo>
			</TinyImageWrapper>
		</div>
	)
}