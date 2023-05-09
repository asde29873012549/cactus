import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useSelector} from 'react-redux'
import {MEDIA_QUERY_SM, MEDIA_QUERY_MD} from '../breakpoints'



const DesignerIntroWrapper = styled.div `
width:80%;
${props => props.isIntroSectionOpen ? 'height:auto' : 'height:500px'};
border:1px solid rgb(180, 180, 180);
margin:60px auto;
border-radius:3px;
overflow:hidden;
position:relative;
${MEDIA_QUERY_MD} {
	width:100vw;
}
${MEDIA_QUERY_SM} {
	width:100vw;
}
`

const Banner = styled.div `
height:200px;
background-image:url('${props => props.banner ? props.banner : props.banner}');
background-size:cover;
background-position:center;
`

const Body = styled.div `
height:300px;
padding:0 18%;
margin:30px 0;
line-height:30px;
font-size:1rem;
box-sizing:border-box;
overflow:hidden;
${MEDIA_QUERY_MD} {
	margin-top:80px;
	font-size:0.8rem;
	padding:0 8vw;
}
${MEDIA_QUERY_SM} {
	margin-top:80px;
	font-size:0.8rem;
	padding:0 5vw;
}
`

const HideSection = styled.div `
position:absolute;
margin-top:400px;
height:100px;
background:linear-gradient(to top, white, transparent);
width:100%;
${props => props.isIntroSectionOpen ? 'display:none' : 'display:flex'};
padding:20px 40px;
box-sizing:border-box;
justify-content:flex-end;
align-items:flex-end;

`

const ReadMore =styled.div `
width:100px;
height:30px;
background-color:white;
font-size:0.7rem;
font-weight:800;
color:rgb(70, 70, 70);
border-radius:5px;
line-height:30px;
text-align:center;
border:1px solid rgb(70, 70, 70);
transition:all 0.2s ease-in;
&:hover {
	cursor:pointer;
	color:white;
	background-color:rgb(70, 70, 70);
}
${MEDIA_QUERY_MD} {
	margin:0 auto;
}
${MEDIA_QUERY_SM} {
	margin:0 auto;
}
`

const ReadLess = styled(ReadMore) `
margin-left:85%;
margin-bottom:30px;
${props => props.isIntroSectionOpen ? null : 'display:none'};
${MEDIA_QUERY_MD} {
	margin:30px auto;
}
${MEDIA_QUERY_SM} {
	margin:30px auto;
}
`

const BrandAvatar = styled.div `
height:140px;
width:140px;
margin-top:135px;
margin-left:40px;
border-radius:50%;
position:absolute;
inset:0;
background-image:url('${props => props.logo ? props.logo : null}');
background-size:cover;
background-position:center;
filter: drop-shadow(0px 10px 10px rgba(70, 70, 70,.2));
${MEDIA_QUERY_MD} {
	margin:0 auto;
	margin-top:135px;
}
${MEDIA_QUERY_SM} {
	margin:0 auto;
	margin-top:135px;
}
`

export default function DesignerIntroSection ({id, designerSelector}) {
	const designerInfo = useSelector(designerSelector)
	const [isIntroSectionOpen, setIsIntroSectionOpen] = useState(false)

	useEffect(() => {
		return () => {
			setIsIntroSectionOpen(false)
		}
	}, [])

	//on Click read more
	const onReadMoreClick = () => {
		setIsIntroSectionOpen(!isIntroSectionOpen)
	}

	return (
		<DesignerIntroWrapper isIntroSectionOpen={isIntroSectionOpen}>
			<BrandAvatar logo={designerInfo.designer.logo}/>
			<HideSection isIntroSectionOpen={isIntroSectionOpen}>
				<ReadMore onClick={onReadMoreClick}>SHOW MORE</ReadMore>
			</HideSection>
			<Banner banner={designerInfo.designer.Banner}></Banner>
			<Body>
				{designerInfo.designer.Introduction}
			</Body>
			<ReadLess onClick={onReadMoreClick} isIntroSectionOpen={isIntroSectionOpen}>SHOW LESS</ReadLess>
		</DesignerIntroWrapper>
	)
}