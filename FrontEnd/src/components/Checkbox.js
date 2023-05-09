import React from 'react'
import styled from 'styled-components'


const CheckboxWrapper = styled.div `
display:flex;
align-items:center;
margin:4px 0;
`

const DepartmentTitle = styled.span `
font-size:0.8rem;
&:hover {
	cursor:pointer;
}

`

const Check = styled.input `
text-align:center;
`


export default function Checkbox ({onCheckboxChange, value}) {
	
	//on check box check
	const onChecked = target => {
		onCheckboxChange(target)
	}

	return (
			<label><CheckboxWrapper><Check type='checkbox'value={value.name} onChange={e => onChecked(e)}/><DepartmentTitle>{value.name}</DepartmentTitle></CheckboxWrapper></label>
		
	)
}