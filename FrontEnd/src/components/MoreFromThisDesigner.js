import React from 'react'
import styled from 'styled-components'
import ListingCard from '../components/ListingCard'

const DesignerWrapper = styled.div `
margin:0 auto;
width:90%;
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