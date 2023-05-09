import React, {useEffect, useRef} from 'react'
import styled from 'styled-components'
import {MEDIA_QUERY_SM, MEDIA_QUERY_MD} from '../breakpoints'

const Dropdown = styled.div `
width:360px;
border:1px solid grey;
border-radius:4px;
position:absolute;
background-color:white;
display:block;
display:none;
box-sizing:border-box;
max-height:500px;
overflow:scroll;
::-webkit-scrollbar {
    display: none;
}
${MEDIA_QUERY_MD} {
	max-width:350px;
}
${MEDIA_QUERY_SM} {
	max-width:300px;
}
`
const Option = styled.div `
display:flex;
justify-content:space-between;
box-sizing:border-box;
align-items:center;
padding:0px 5px;
box-sizing:border-box;
font-size:0.9rem;
font-weight:normal;
color:grey;
line-height:40px;
&:hover {
	cursor:pointer;
	font-weight:900;
	background-color:rgba(240, 240, 240, 0.5);
	color:#1C1C1C;
};

`

const Detail = styled.div `
width:360px;
height:40px;
border:1px solid grey;
color:grey;
border-radius:6px;
font-size:0.9rem;
text-align:center;
line-height:38px;
box-sizing:border-box;
margin-top:30px;
${MEDIA_QUERY_MD} {
	max-width:350px;
	height:40px;
}
${MEDIA_QUERY_SM} {
	max-width:300px;
	height:40px;
}
`


export default function SellPageDropdown({reference, sellInput, categories, dataRef, setSellInput, indicator}) {
	const dropdownRef = useRef(null)
	const data = indicator === 'subCategory' ? categories.filter(subCategory => subCategory.category_id === dataRef.current.category_id) : categories


	useEffect(() => {
		const release = (e) => {
			if (reference.current !== null) {
				if (!reference.current.contains(e.target)) {
					dropdownRef.current.style.display = 'none'
				}
			}
		}
		
		document.addEventListener('mousedown', release)
	})

	const onDropdown = () => {
		if (dropdownRef.current.style.display === '' || dropdownRef.current.style.display === 'none') {
			dropdownRef.current.style.display = 'block'
		} else {
			dropdownRef.current.style.display = 'none'
		}
	}

	const onOptionChoose = (subCategoryName, subCategoryId, key) => {

		if (key === 'subCategory') {
			setSellInput({...sellInput, subCategory:subCategoryName})
			dataRef.current.subCategory_id = subCategoryId
		} else if (key === 'designer') {
			setSellInput({...sellInput, designer:subCategoryName})
			dataRef.current.designer_id = subCategoryId
		} else if (key === 'size') {
			setSellInput({...sellInput, size:subCategoryName})
			dataRef.current.SizeId = subCategoryId
		} else if (key === 'condition') {
			setSellInput({...sellInput, condition:subCategoryName})
			dataRef.current.condition_id = subCategoryId
		} else {
			dropdownRef.current.style.display = ''
			return
		}

		dropdownRef.current.style.display = 'none !important'
	}



	return (
		<Detail onClick={onDropdown} ref={reference}>{sellInput[indicator]}
			<Dropdown ref={dropdownRef}>
					{data
					.map(subCategory => 
					<Option key={subCategory.id} onClick={() => onOptionChoose(subCategory.name , subCategory.id, indicator)}>
						{subCategory.name}
					</Option>)}
			</Dropdown>
		</Detail>
	)
}