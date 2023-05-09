import React from 'react'
import styled from 'styled-components'


const MediumImageWrapper = styled.div `
width:380px;
height:550px;
background-image:url('https://res.cloudinary.com/ssenseweb/image/upload/w_768,q_90,f_auto,dpr_auto/v1668091944/rkizkvtm9kvr75436bns.jpg');
background-size:cover;
background-position:center;
`

const MediumFooter = styled.div `
width:300px;
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


export default function ArticleMediumImageCard () {
	return (
		<div>
			<MediumImageWrapper/>
			<MediumFooter>
				<Title>Community Craftsmanship: Acne Studios Repurposed FW22</Title>
				<Content>FIVE NEW YORK–BASED ARTISTS TRY OUT THE SSENSE EXCLUSIVE COLLECTION</Content>
			</MediumFooter>
		</div>
	)
}