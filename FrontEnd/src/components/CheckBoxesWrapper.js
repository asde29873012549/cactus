import React from 'react'
import styled from 'styled-components'


const CheckboxesWrapper = styled.div `
${props => props.active ? 'display:flex' : 'display:none'};
flex-direction:column;
margin-left:20px;

`


export default function CheckBoxesWrapper ({children}) {


	return (
		<CheckboxesWrapper>{children}</CheckboxesWrapper>
	)
}