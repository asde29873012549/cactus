import React from 'react'
import styled from 'styled-components'
import youtube from './static/youtube.png'
import facebook from './static/facebook.png'
import twitter from './static/twitter.png'
import instagram from './static/instagram.png'
import {MEDIA_QUERY_SM, MEDIA_QUERY_MD} from '../breakpoints'


const FooterWrapper = styled.div `
display:flex;
flex-direction:column;
background-color:white;
justify-content:center;
align-items:center;
width:100vw;
padding:20px 0px;
${MEDIA_QUERY_MD} {
	margin-bottom:60px;
}
`

const Section = styled.div `
font-size:0.7rem;
font-weight:500;
color:#1C1C1C;
width:65vw;
margin:0 auto;
display:flex;
justify-content:space-between;
letter-spacing:-0.5px;
align-items:center;
${MEDIA_QUERY_MD} {
	flex-direction:column;
	line-height:18px;
}

`

const SubSection = styled(Section) `
width:35vw;
color:rgb(130, 130, 130);
letter-spacing:0px;
margin-top:10px;
`

const Icons = styled.div `
width:12px;
height:12px;
background-image:url(${props => props.image && props.image});
background-size:cover;
background-position:center;
&+& {
	margin-left:15px;
}
${MEDIA_QUERY_MD} {
	margin-top:10px;
}
`

const IconsWrapper = styled.div `
display:flex;
`


export default function Footer () {
	return (
		<FooterWrapper>
			<Section>
				<div>COUNTRY:TAIWAN</div>
				<div>NEWSLETTER</div>
				<div>CUSTUMER CARE</div>
				<div>LOCATION</div>
				<div>EDITORIALS</div>
				<div>CAREERS</div>
				<div>SITEMAP</div>
				<IconsWrapper>
					<Icons image={facebook}/>
					<Icons image={twitter}/>
					<Icons image={instagram}/>
					<Icons image={youtube}/>
				</IconsWrapper>
			</Section>
			<SubSection>
				<div>© 2022 cactus.com</div>
				<div>Terms & Conditions</div>
				<div>Privacy Policy</div>
				<div>Accessibility</div>
				<div>Shippment</div>
			</SubSection>
		</FooterWrapper>
	)
}