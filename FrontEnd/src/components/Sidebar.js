import React, {useState, useRef, useEffect} from 'react'
import styled from 'styled-components'
import Checkbox from './Checkbox'
import Search from './static/search.png'
import {useDispatch, useSelector} from 'react-redux'
import {
	openDepartment,
	openCategory,
	openSize,
	openPrice,
	openDesigner,
	openCondition,
	shopSelector
} from '../redux/shopSlice'
import DepartmentWrapper from './DepartmentWrapper'
import {getDesigner, getSize, getDepartment, getCondition, getCategory, getSubCategory} from '../WebAPI.js'
import {MEDIA_QUERY_SM, MEDIA_QUERY_MD} from '../breakpoints'

const SidebarWrapper = styled.div `
display:flex;
flex-direction:column;
align-items:flex-start;
justify-content:center;
width:100%;
${MEDIA_QUERY_MD} {
	display:${props => props.mobileActive ? 'block' :'none'};
	position:absolute;
	background-color:white;
	z-index:5;
	width:${props => props.mobileActive ? '40vw' :'0'};
	padding-right:7px;
	transition:all 0.5s ease-in-out;
}
${MEDIA_QUERY_SM} {
	display:${props => props.mobileActive ? 'block' :'none'};
	position:absolute;
	background-color:white;
	z-index:5;
	width:${props => props.mobileActive ? '35vw' :'0'};
	padding-right:7px;
	transition:all 0.5s ease-in-out;
}
`

const SidebarTitles = styled.div `
font-size:1.2rem;
font-weight:700;
&:hover {
	cursor:pointer;
}
${MEDIA_QUERY_MD} {
	font-size:0.8rem;
}
${MEDIA_QUERY_SM} {
	font-size:0.8rem;
}
`

const SeparationBar = styled.div `
width:100%;
background-color:#BDC0BA;
height:1px;
`

const MenswearTitle = styled.div `
font-wieght:900;
font-size:1rem;
margin-left:-15px;
&:hover {
	cursor:pointer;
}
${MEDIA_QUERY_MD} {
	font-size:0.7rem;
}
${MEDIA_QUERY_SM} {
	font-size:0.7rem;
}
`

const MenswearSection = styled.div `
display:flex;
flex-direction:column;
margin-left:40px;
${MEDIA_QUERY_MD} {
	margin-left:30px;
}
${MEDIA_QUERY_SM} {
	margin-left:20px;
}
`

const WomenswearSection = styled.div `
display:flex;
flex-direction:column;
margin-left:40px;
${MEDIA_QUERY_MD} {
	margin-left:30px;
}
${MEDIA_QUERY_SM} {
	margin-left:20px;
}
`

const Catogories = styled.div `
display:flex;
flex-direction:column;
`

const Category = styled.div `
margin:7px 0;
display:flex;
justify-content:space-between;
align-items:center;
width:100%;
&:hover {
	cursor:pointer;
}
`

const Name = styled.div `
font-size:0.8rem;
font-weight:500;
&:hover {
	cursor:pointer;
}
${MEDIA_QUERY_MD} {
	font-size:0.6rem;
}
${MEDIA_QUERY_SM} {
	font-size:0.6rem;
}
`

const Arrow = styled.div `
width:10px;
height:10px;
background-color:#1C1C1C;
-webkit-clip-path:polygon(0 40%, 50% 85%, 100% 40%, 100% 55%, 50% 100%, 0 55%);
${MEDIA_QUERY_MD} {
	width:8px;
	height:8px;
}
${MEDIA_QUERY_SM} {
	width:6px;
	height:6px;
}
`

const DesignerSearchbarWrapper = styled.div `
position:relative;
margin:20px 0;
display:flex;
align-items:center;
margin-left:20px;
`

const DesignerSearchBar = styled.input `
width:80%;
height:30px;
border-radius:6px;
border:1px solid grey;
`

const SearchImage = styled.div `
background-image:url(${Search });
width:15px;
height:15px;
background-position:center;
background-size:cover;
position:absolute;
margin-left:10px;
background-color:white;
`

const PriceSection = styled.div `
display:flex;
justify-content:center;
align-items:center;
margin:20px 0;
&:hover {
	cursor:pointer;
}
${MEDIA_QUERY_MD} {
	font-size:1rem;
}
${MEDIA_QUERY_SM} {
	font-size:0.7rem;
}
`

const MinPrice = styled.input `
margin-right:10px;
width:70px;
height:25px;
border-radius:4px;
border:1px solid grey;
${MEDIA_QUERY_MD} {
	width:8vw;
	height:15px;
}
${MEDIA_QUERY_SM} {
	width:8vw;
	height:15px;
}
`

const MaxPrice = styled.input `
margin-left:10px;
width:70px;
height:25px;
border-radius:4px;
border:1px solid grey;
${MEDIA_QUERY_MD} {
	width:8vw;
	height:15px;
}
${MEDIA_QUERY_SM} {
	width:8vw;
	height:15px;
}
`

const CheckBoxesWrapper = styled.div `
display:flex;
flex-direction:column;
margin-left:20px;

`

const CategoryCheckBoxesWrapper = styled(CheckBoxesWrapper) `
display:none;

`

export default function Sidebar ({onCheckboxChange}) {
	const dispatch = useDispatch()
	const sidebarSelect = useSelector(shopSelector)
	const [designers, setDesigners] = useState([])
	const [sizes, setSizes] = useState([])
	const [departments, setDepartments] = useState([])
	const [conditions, setConditions] = useState([])
	const [categories, setCategories] = useState([])
	const [subCategories, setSubCategories] = useState([])
	const subCategoryRef = useRef(null)

	useEffect(() => {
		getDesigner(setDesigners)
		getSize(setSizes)
		getDepartment(setDepartments)
		getCondition(setConditions)
		getCategory(setCategories)
		getSubCategory(setSubCategories)
	},[])

	const onDepartmentClick = () => {
		dispatch(openDepartment())
	}

	const onPriceClick = () => {
		dispatch(openPrice())
	}

	const onSizeClick = () => {
		dispatch(openSize())
	}

	const onDesignerClick = () => {
		dispatch(openDesigner())
	}

	const onConditionClick = () => {
		dispatch(openCondition())
	}

	const onCategory = () => {
		dispatch(openCategory())
	}

	const getMap = ref => {
		if (!ref.current) {
			ref.current = new Map()
		}
		return ref.current
	}
	

	const onCategoryClick = (id) => {
		const map = getMap(subCategoryRef)
		const node = map.get(id)
		if (node.style.display === 'flex') {
			node.style.display='none'
		} else {
			node.style.display='flex'
		}
	}

	const onCheckboxWrapperToggle = (node, id) => {
		const map = getMap(subCategoryRef)
		if (node) {
			map.set(id, node)
		} else {
			map.delete(id)
		}
	}


	return (
		<SidebarWrapper mobileActive={sidebarSelect.sideBarMobileActive}>
			<DepartmentWrapper>
				<SidebarTitles onClick={onDepartmentClick}>Department</SidebarTitles>
				{sidebarSelect.sidebar.department ?
				<CheckBoxesWrapper>
					{departments.map(department => <Checkbox key={department.id} value={department} onCheckboxChange={e => onCheckboxChange(e, {department:department.id})}></Checkbox>)}
				</CheckBoxesWrapper> :null}
			</DepartmentWrapper>
			<SeparationBar/>
			<DepartmentWrapper>
				<SidebarTitles onClick={onCategory}>Category</SidebarTitles>
				<>
				<MenswearSection>
					<MenswearTitle>Menswear</MenswearTitle>
					{categories
					.filter(category => category.department_id === 1)
					.map(category => 
					<Catogories key={category.id}>
						<Category onClick={() => onCategoryClick(category.id)}>
							<Name>{category.name}</Name>
							<Arrow></Arrow>
						</Category>
						<CategoryCheckBoxesWrapper ref={node => onCheckboxWrapperToggle(node, category.id)}>
							{subCategories
							.filter(subCategory => Number(subCategory.category_id) === category.id)
							.map(subCategory =>
								<Checkbox key={subCategory.id} value={subCategory} onCheckboxChange={e => onCheckboxChange(e, {subCategory:subCategory.id})}></Checkbox>
							)}
						</CategoryCheckBoxesWrapper>
					</Catogories>
					)}
				</MenswearSection>
				<WomenswearSection>
					<MenswearTitle>Womenswear</MenswearTitle>
					{categories
					.filter(category => category.department_id === 2)
					.map(category => 
					<Catogories key={category.id}>
						<Category onClick={() => onCategoryClick(category.id)}>
							<Name>{category.name}</Name>
							<Arrow></Arrow>
						</Category>
						<CategoryCheckBoxesWrapper ref={node => onCheckboxWrapperToggle(node, category.id)}>
							{subCategories
							.filter(subCategory => Number(subCategory.category_id) === category.id)
							.map(subCategory =>
								<Checkbox key={subCategory.id} value={subCategory} onCheckboxChange={e => onCheckboxChange(e, {subCategory:subCategory.id})}></Checkbox>
								)}
						</CategoryCheckBoxesWrapper>
					</Catogories>
					)}
				</WomenswearSection></>
			</DepartmentWrapper>
			<SeparationBar/>
			<DepartmentWrapper>
				<SidebarTitles onClick={onSizeClick}>Size</SidebarTitles>
				{ sidebarSelect.sidebar.size ? 
				<CheckBoxesWrapper>
					{sizes.map(size => <Checkbox key={size.id} value={size} onCheckboxChange={e => onCheckboxChange(e, {size:size.id})}></Checkbox>)}
				</CheckBoxesWrapper>:null}
			</DepartmentWrapper>
			<SeparationBar/>
			<DepartmentWrapper>
				<SidebarTitles onClick={onDesignerClick}>Designer</SidebarTitles>
				{ sidebarSelect.sidebar.designer ? 
				<>
				<DesignerSearchbarWrapper>
					<SearchImage/>
					<DesignerSearchBar></DesignerSearchBar>
				</DesignerSearchbarWrapper>
				<CheckBoxesWrapper>
					{designers.map(designer => <Checkbox key={designer.id} value={designer} onCheckboxChange={e => onCheckboxChange(e, {designer:designer.id})}></Checkbox>)}
				</CheckBoxesWrapper></>:null}
			</DepartmentWrapper>
			<SeparationBar/>
			<DepartmentWrapper>
				<SidebarTitles onClick={onPriceClick}>Price</SidebarTitles>
				{ sidebarSelect.sidebar.price ? 
				<PriceSection>
					<MinPrice></MinPrice>
					<div>to</div>
					<MaxPrice></MaxPrice>
				</PriceSection>:null}
			</DepartmentWrapper>
			<SeparationBar/>
			<DepartmentWrapper>
				<SidebarTitles onClick={onConditionClick}>Condition</SidebarTitles>
				{ sidebarSelect.sidebar.condition ? 
				<CheckBoxesWrapper>
					{conditions.map(condition => <Checkbox key = {condition.id} value={condition} onCheckboxChange={e => onCheckboxChange(e, {condition:condition.id})}></Checkbox>)}
				</CheckBoxesWrapper>:null}
			</DepartmentWrapper>
			<SeparationBar/>
		</SidebarWrapper>
	)
}