import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import menu from './static/menu.png'
import {getDesigner} from '../WebAPI'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {openMobileCategory} from '../redux/shopSlice'
import {MEDIA_QUERY_SM, MEDIA_QUERY_MD} from '../breakpoints'


const Wrapper = styled.div `
width:95vw;
overflow:scroll;
display:none;
white-space:nowrap;
line-height:5vh;
margin-left:10px;
overflow-y:hidden;
${MEDIA_QUERY_MD} {
	display:flex;
}
${MEDIA_QUERY_SM} {
	display:flex;
}
`

const Refine = styled(Link) `
display:inline-block;
height:4vh;
color:rgb(180, 180, 180);
border-radius:5px;
border:1px solid rgb(180, 180, 180);
font-size:0.7rem;
text-align:center;
line-height:4vh;
padding:0 5px;
text-decoration:none;
box-sizing:border-box;
 &+& {
	margin-left:5px;
 }
`

const Refinement = styled.div`
height:4vh;
color:rgb(180, 180, 180);
border-radius:5px;
border:1px solid rgb(180, 180, 180);
font-size:0.7rem;
text-align:center;
line-height:4vh;
padding:0 5px;
box-sizing:border-box;
width:15%;
display:flex;
align-items:center;
margin-right:5px;

`

const RefineImg = styled.div `
background-image:url(${menu});
background-size:80%;
width:8vw;
height:3vh;
background-repeat:no-repeat;
background-position:center;
`

const Div = styled.div `
display:inline-block;
width:8vw;
`
export default function MobileRefineSection () {
	const [popularDesigners, setPopularDesigners] = useState([])
	const dispatch = useDispatch()

	useEffect(() => {
		getDesigner(setPopularDesigners)
	}, [])

	const openCategoryChoose = () => {
		dispatch(openMobileCategory())
	}

	return (
		<Wrapper>
			<Refinement onClick={openCategoryChoose}>
				<Div>
					<RefineImg/>
				</Div>
			</Refinement>
			{popularDesigners.filter(designer => designer.id < 7).map(designer => <Refine to={`/shop/designerListing/${designer.id}`} key={designer.name}>{designer.name}</Refine>)}
		</Wrapper>
	)
}