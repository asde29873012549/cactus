import React from 'react'
import styled from 'styled-components'


const Department = styled.div `
margin:10px 0;
display:flex;
flex-direction:column;
width:100%;
`

export default function DepartmentWrapper ({children}) {

	return (
		<Department>{children}</Department>
	)
}