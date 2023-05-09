import React from 'react'
import styled from 'styled-components'
import ArticleCard from './ArticleCard'
import {designerSelector} from '../redux/designerSlice'
import {useSelector} from 'react-redux'
import {ConvertToCapital} from './utils'
import {MEDIA_QUERY_SM, MEDIA_QUERY_MD} from '../breakpoints'


const ArticleCardsWrapper = styled.div `
width:100%;
margin:0 auto;
display:flex;
justify-content:space-between;
`

const Title = styled.div `
font-size:1.3rem;
color:#1C1C1C;
font-weight:900;
margin:40px 0;
`

const RelatedArticleSectionWrapper = styled.div `
width:80%;
margin:0 auto;
${MEDIA_QUERY_MD} {
	display:none;
}
${MEDIA_QUERY_SM} {
	display:none;
}
`


export default function RelatedArticlesSection () {
	const designerInfo = useSelector(designerSelector)
	
	return (
		<RelatedArticleSectionWrapper>
			<Title>{`Related ${ConvertToCapital(designerInfo.designer.name)} Articles`}</Title>
			<ArticleCardsWrapper>
				<ArticleCard/>
				<ArticleCard/>
				<ArticleCard/>
				<ArticleCard/>
			</ArticleCardsWrapper>
		</RelatedArticleSectionWrapper>
	)
}