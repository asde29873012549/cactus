import React from 'react'
import styled from 'styled-components'

const SidebarTitles = styled.div `
font-size:1.2rem;
font-weight:700;
`


export default function SideBarTitles ({children}) {


	return (
		<SidebarTitles>{children}</SidebarTitles>
	)
}