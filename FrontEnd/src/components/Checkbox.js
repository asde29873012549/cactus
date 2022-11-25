import React from 'react'
import styled from 'styled-components'
import {MEDIA_QUERY_SM, MEDIA_QUERY_MD} from '../breakpoints'

const CheckboxWrapper = styled.div `
display:flex;
align-items:center;
margin:4px 0;
${MEDIA_QUERY_MD} {
	margin:1px 0;
}
${MEDIA_QUERY_SM} {
	margin:1px 0;
}
`

const DepartmentTitle = styled.span `
font-size:0.8rem;
&:hover {
	cursor:pointer;
}
${MEDIA_QUERY_MD} {
	font-size:0.4rem;
}
${MEDIA_QUERY_SM} {
	font-size:0.4rem;
}
`

const Check = styled.input `
text-align:center;
${MEDIA_QUERY_MD} {
	width:0.4rem;
}
${MEDIA_QUERY_SM} {
	width:0.4rem;
}
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