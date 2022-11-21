import React from 'react'
import styled from 'styled-components'


const BigImageWrapper = styled.div `
width:600px;
height:500px;
background-image:url('https://res.cloudinary.com/ssenseweb/image/upload/w_1280,q_90,f_auto,dpr_auto/v1668434286/maiqdcmzqyxvoc8rpfvx.jpg');
background-size:cover;
background-position:center;
`

const BigFooter = styled.div `
width:600px;
height:140px;
background-color:white;
font-size:1rem;
padding-top:10px;
box-sizing:border-box;
`

const Title = styled.div `
font-weight:900;
`

const Content = styled.div `
white-space:break-spaces;
margin-top:15px;
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
`

export default function ArticleBigImageCard () {
	return (
		<div>
			<BigImageWrapper />
			<BigFooter>
				<Title>Community Craftsmanship: Acne Studios Repurposed FW22</Title>
				<Content>FIVE NEW YORK–BASED ARTISTS TRY OUT THE SSENSE EXCLUSIVE COLLECTION</Content>
			</BigFooter>
		</div>
		
	)
}