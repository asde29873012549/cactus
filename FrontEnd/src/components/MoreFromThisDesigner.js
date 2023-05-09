import React from 'react'
import styled from 'styled-components'
import ListingCard from '../components/ListingCard'
import {MEDIA_QUERY_SM, MEDIA_QUERY_MD} from '../breakpoints'

const DesignerWrapper = styled.div `
margin:0 auto;
width:90%;
${MEDIA_QUERY_MD} {
	margin-bottom:60px;

${MEDIA_QUERY_SM} {
	margin-bottom:60px;
}
`

const DesignerWrapperTitle = styled.div `
font-size:1.2rem;
font-weight:900;
margin:30px 0;
`

export default function MoreFromThisDesigner ({filteredListing}) {
	return (
		<DesignerWrapper>
			<DesignerWrapperTitle>MORE FROM THIS DESIGNER</DesignerWrapperTitle>
			{filteredListing.map(listing => <ListingCard key={listing.id} id={listing.id}>{listing}</ListingCard>)}
		</DesignerWrapper>
	)
}