import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import {getDesigner, getCategory, getSubCategory, getFilteredListing, getSingleDesinger} from '../WebAPI'
import {DropdownMenu} from './utils'
import {getAllFilteredListing} from '../redux/shopSlice'
import {getSingleDesigner} from '../redux/designerSlice'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {MEDIA_QUERY_SM, MEDIA_QUERY_MD} from '../breakpoints'

const NavBarWrapper = styled.div `
width:90vw;
margin:0 auto;
height:30px;
display:flex;
justify-content:space-between;
align-items:center;
font-size:0.9rem;
padding:5px;
${MEDIA_QUERY_MD} {
	display:none;
}
`

const DropDownWrapper = styled.div `
padding:20px 40px;
width:90vw;
height:380px;
border-radius:0 0 3px 3px;
display:none;
align-items:center;
justify-content:space-between;
position:absolute;
color:#1C1C1C;
background-color:white;
box-sizing:border-box;
z-index:3;
margin-left:-30px;
margin-top:1px;
filter: drop-shadow(0px 25px 20px rgba(70, 70, 70,.4));
&:hover {
	display:flex;
}
`

const Line = styled.div `
height:1px;
width:100vw;
background-color:rgba(0, 0, 0, 0.2);
${MEDIA_QUERY_MD} {
	display:none;
}
`

const NavButton = styled.div `
line-height:40px;
padding:0 50px;
&:hover {
	cursor:pointer;
	color:#DB4D6D;
}

&:hover ${DropDownWrapper} {
	display:flex;
}
`

const LINKS = styled(Link) `
text-decoration:none;
color:#1C1C1C;
line-height:40px;
&:hover {
	cursor:pointer;
	color:#DB4D6D;
}
`

const Title = styled.div `
font-size:1.3rem;
font-weight:200;
`

const Designer = styled(Link) `
width:20%;
font-size:1rem;
margin:4px 10px;
display:inline-block;
text-decoration:none;
color:#1C1C1C;
&:hover {
	cursor:pointer;
	color:#DB4D6D;
}
`

const DesignerWrapper = styled.div `
display:flex;
flex-direction:column;
height:300px;
width:1000px;
margin:0 auto;
flex-wrap:wrap;
`

const Button = styled.div `
`

const Arrow = styled.div `
background-color:#1C1C1C;
clip-path: polygon(40% 0, 75% 0%, 100% 50%, 75% 100%, 40% 100%, 63% 50%);
width:10px;
height:10px;
`

const SubDropdownMenu = styled.div `
font-size:0.9rem;
color:#1C1C1C;
background-color:white;
position:absolute;
z-index:4;
border-radius:0 0 2px 2px;
filter: drop-shadow(0px 25px 20px rgba(70, 70, 70,.4));
margin-left:180px;
margin-top:-40px;
filter: drop-shadow(15px 25px 20px rgba(70, 70, 70,.4));
display:none;
`

const ButtonWrapper = styled(Link) `
display:flex;
justify-content:space-between;
align-items:center;
width:150px;
padding:0 15px;
text-decoration:none;
color:#1C1C1C;
&:hover {
	cursor:pointer;
	color:#DB4D6D;
};
&:hover ${Arrow} {
	cursor:pointer;
	background-color:#DB4D6D;
};

`

const SubButtonWrapperLink = styled(ButtonWrapper) `
display:flex;
justify-content:space-between;
align-items:center;
width:150px;
padding:0 15px;
text-decoration:none;
color:#1C1C1C;
&:hover {
	cursor:pointer;
	color:#DB4D6D;
};
`

export default function Navbar () {
	const dispatch = useDispatch()
	const [isActive, setIsActive] = useState({
		menswear:false,
		womenswear:false,
		StaffPicks:false,
		Articles:false
	})
	const [category, setCategory] = useState([{}])
	const [designer, setDesigner] = useState([{}])
	const [subCategory, setSubCategory] = useState([{}])
	const mensDropdownRef = useRef(null)
	const womensDropdownRef = useRef(null)
	
	useEffect(() => {
		getDesigner(setDesigner)
		getCategory(setCategory)
		getSubCategory(setSubCategory)
	},[])

	const onMenswearOver = () => {
		setIsActive({...isActive, menswear:true})
	}

	const onMenswearLeave= () => {
		setIsActive({...isActive, menswear:false})
	}

	const onWomenswearOver = () => {
		setIsActive({...isActive, womenswear:true})
	}

	const onWomenswearLeave = () => {
		setIsActive({...isActive, womenswear:false})
	}

	const onSubCategoryClick = (id) => {
		getFilteredListing(getAllFilteredListing , `subCategory=${id}`, dispatch)
	}

	const onCategoryClick = (id) => {
		getFilteredListing(getAllFilteredListing , `category=${id}`, dispatch)
	}

	const onDesignerClick = (id) => {
		getFilteredListing(getAllFilteredListing , `designer=${id}`, dispatch)
		getSingleDesinger(id, getSingleDesigner, dispatch)
	}

	const getMap = (ref) => {
		if (!ref.current) {
			ref.current = new Map()
		}
		return ref.current
	}

	const getNode = (node, key, ref) => {
		const map = getMap(ref)
		if (node) {
			map.set(key, node)
		}
	}

	const onMensCategoryOver = (key) => {
		const categoryMap = getMap(mensDropdownRef)
		const categoryNode = categoryMap.get(key)
		categoryNode.style.display = 'block'
	}

	const onMensCategoryLeave = (key) => {
		const categoryMap = getMap(mensDropdownRef)
		const categoryNode = categoryMap.get(key)
		categoryNode.style.display = 'none'
	}

	const onWomensCategoryOver = (key) => {
		const categoryMap = getMap(womensDropdownRef)
		const categoryNode = categoryMap.get(key)
		categoryNode.style.display = 'block'
	}

	const onWomensCategoryLeave = (key) => {
		const categoryMap = getMap(womensDropdownRef)
		const categoryNode = categoryMap.get(key)
		categoryNode.style.display = 'none'
	}

	return (
		<>
		<Line />
		<NavBarWrapper>
			<NavButton>DESIGNERS
				<DropDownWrapper>
					<Title>Designers A-Z</Title>
					<DesignerWrapper>
						{designer.map(designer => 
						<Designer 
						key={`${designer.id}:${designer.index}`} 
						onClick={() => onDesignerClick(designer.id)} 
						to={`/shop/designerListing/${designer.id}`}>
							{designer.name}
							</Designer>) }
					</DesignerWrapper>
				</DropDownWrapper>
			</NavButton>
			<NavButton onMouseOver={onMenswearOver} onMouseLeave={onMenswearLeave}>MENSWEAR
				<DropdownMenu isActive={isActive.menswear}>
					{category.filter(category => category.department_id === 1).map(category => 
					<div key={`${category.id}:${category.index}`}>
					<ButtonWrapper  
					onClick={() => onCategoryClick(category.id)} 
					to={`/shop/menswear/categoryListing/${category.id}`} 
					onMouseOver={() => onMensCategoryOver(category.name)} 
					onMouseLeave={() => onMensCategoryLeave(category.name)}>
						<Button>{category.name}</Button>
						<Arrow/>
					</ButtonWrapper>
					<SubDropdownMenu ref={node => getNode(node, category.name, mensDropdownRef)}>
						{subCategory.filter(subCategory => subCategory.category_id === category.id).map(subCategory => 
						<SubButtonWrapperLink 
						key={`${subCategory.id}:${subCategory.index}`}  
						onClick={() => onSubCategoryClick(subCategory.id)} 
						to={`/shop/menswear/subCategoryListing/${subCategory.id}`} 
						onMouseOver={() => onMensCategoryOver(category.name)} 
						onMouseLeave={() => onMensCategoryLeave(category.name)}>
							<Button>{subCategory.name}</Button>
						</SubButtonWrapperLink>
						)}
					</SubDropdownMenu>
					</div>
					)}
				</DropdownMenu>
			</NavButton>
			<NavButton onMouseOver={onWomenswearOver} onMouseLeave={onWomenswearLeave}>WOMENSWEAR
				<DropdownMenu isActive={isActive.womenswear}>
					{category.filter(category => category.department_id === 2).map(category => 
					<div key={`${category.id}:${category.index}`}>
					<ButtonWrapper 
					onClick={() => onCategoryClick(category.id)} 
					to={`/shop/womenswear/categoryListing/${category.id}`} 
					onMouseOver={() => onWomensCategoryOver(category.name)} 
					onMouseLeave={() => onWomensCategoryLeave(category.name)}>
						<Button>{category.name}</Button>
						<Arrow/>
					</ButtonWrapper>
					<SubDropdownMenu  ref={node => getNode(node, category.name, womensDropdownRef)}>
						{subCategory.filter(subCategory => subCategory.category_id === category.id).map(subCategory => 
						<SubButtonWrapperLink 
						key={`${subCategory.id}:${subCategory.index}`} 
						onClick={() => onSubCategoryClick(subCategory.id)} 
						to={`/shop/womenswear/subCategoryListing/${subCategory.id}`} 
						onMouseOver={() => onWomensCategoryOver(category.name)} 
						onMouseLeave={() => onWomensCategoryLeave(category.name)}>
							<Button>{subCategory.name}</Button>
						</SubButtonWrapperLink>
						)}
					</SubDropdownMenu>	
					</div>
					)}
				</DropdownMenu>
			</NavButton>
			<LINKS to='/shop/staffPick'>STAFF PICKS</LINKS>
			<LINKS to='/articles'>ARTICLES</LINKS>
		</NavBarWrapper>
		<Line />
		</>
		
		
	)
}