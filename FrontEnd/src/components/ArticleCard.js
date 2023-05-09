import React from 'react'
import styled from 'styled-components'


const ArticleCardWrapper = styled.div `
width:260px;
height:280px;
`

const ArticleImage = styled.div `
width:100%;
height:75%;
background-image:url('https://image-cdn.hypb.st/https%3A%2F%2Fhk.hypebeast.com%2Ffiles%2F2022%2F03%2Fmaison-margiela-reebok-classic-leather-club-c-memory-of-release-date-01.jpg?q=75&w=800&cbr=1&fit=max');
background-position:center;
background-size:cover;
`

const ArtcleTitle = styled.div `
width:100%;
height:25%;
margin:10px 10px;
font-size:1rem;
font-weight:800;
color:#1C1C1C;
`

export default function ArticleCard () {
	
	return (
		<ArticleCardWrapper>
			<ArticleImage/>
			<ArtcleTitle>The New Margiela</ArtcleTitle>
		</ArticleCardWrapper>
	)
}