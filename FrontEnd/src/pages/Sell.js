import React, {useRef, useState, useEffect} from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import PhotoWrapperSection from '../components/PhotoWrapperSection'
import SellPageInput from '../components/SellPageInput'
import SellPageDropdown from '../components/SellPageDropdown'
import {getDesigner, getSize, getCondition, getCategory, getSubCategory, createListing} from '../WebAPI.js'
import {BlackBackground, PopUpBox} from '../components/utils'
import {accountSelector} from '../redux/accountSlice'
import {useSelector, useDispatch} from 'react-redux'
import AccountForm from '../components/LoginLogout'
import {openLoginForm} from '../redux/accountSlice'
import {MEDIA_QUERY_SM, MEDIA_QUERY_MD} from '../breakpoints'


const SellWrapper = styled.form `
display:flex;
flex-direction:column;
align-items:flex-start;
width:55%;
margin:70px auto;
${MEDIA_QUERY_MD} {
	width:85vw;
}
${MEDIA_QUERY_SM} {
	width:85vw;
}

`

const Head = styled.div ``

const Body = styled.div `
margin:40px auto;
`

const PhotoUploadSection = styled.div `
${MEDIA_QUERY_MD} {
	width:85vw;
}
${MEDIA_QUERY_SM} {
	width:85vw;
}
`

const Title = styled.div `
font-size:1.8rem;
font-weight:900;
${MEDIA_QUERY_MD} {
	font-size:1.4rem;
}
${MEDIA_QUERY_SM} {
	font-size:1.2rem;
}
`

const SectionTitle = styled.div `
font-size:1.5rem;
font-weight:800;
letter-spacing:2px;
color:rgba(0,0,0,0.7);
${MEDIA_QUERY_MD} {
	font-size:1rem;
}
${MEDIA_QUERY_SM} {
	font-size:0.9rem;
}
`

const Details = styled.div ``

const GridWrapper =  styled.div `
display:grid;
grid-template-columns: auto auto;
grid-template-rows: auto auto;
grid-gap:60px 60px;
width:100%;
margin:30px 0;
${MEDIA_QUERY_MD} {
	display:flex;
	flex-direction:column;
	margin:30px auto;
}
${MEDIA_QUERY_SM} {
	display:flex;
	flex-direction:column;
	margin:30px auto;
}
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

const DescriptionInput = styled.textarea `
width:100%;
height:80px;
border:1px solid grey;
color:grey;
border-radius:6px;
margin-top:30px;
box-sizing:border-box;
padding:5px 10px;
font-family:YuGothic;
font-style:italic;
${MEDIA_QUERY_MD} {
	font-size:0.7rem;
}
${MEDIA_QUERY_SM} {
	font-size:0.5rem;
}

`

const Description = styled.div ``

const Photo = styled.div `
margin:0 auto;
${MEDIA_QUERY_MD} {
	width:70vw;
}
${MEDIA_QUERY_SM} {
	width:70vw;
}

`

const FooterWrapper = styled.div `
display:flex;
justify-content:flex-end;
align-items:center;
width:100%;
padding:0 20px;
box-sizing:border-box;
${MEDIA_QUERY_MD} {
	justify-content:center;
}
${MEDIA_QUERY_SM} {
	justify-content:center;
}
`
const DepartmentAndCategory = styled.div `
width:360px;
border:1px solid grey;
border-radius:4px;
position:absolute;
background-color:white;
box-sizing:border-box;
${props => props.dropdownActive ? null: 'display:none'};
${MEDIA_QUERY_MD} {
	max-width:350px;
}
${MEDIA_QUERY_SM} {
	max-width:300px;
}
`

const Submit = styled.input `
width:100px;
height:50px;
background-color:rgb(50, 50, 50);
color:white;
border-radius:10px;
border:0;
text-align:center;
line-height:50px;
font-size:0.9rem;
font-weight:800;
border:2px solid #1C1C1C;
&:hover {
	cursor:pointer;
}
${MEDIA_QUERY_MD} {
	max-width:140px;
	font-size:0.7rem;
}
${MEDIA_QUERY_SM} {
	max-width:90px;
	height:40px;
	font-size:0.6rem;
	line-height:40px;
}
`

const Draft = styled.div `
width:150px;
height:50px;
background-color:white;
color:#1C1C1C;
border-radius:10px;
border:2px solid #1C1C1C;
text-align:center;
line-height:50px;
margin-right:20px;
font-size:0.9rem;
font-weight:800;
&:hover {
	cursor:pointer;
}
${MEDIA_QUERY_MD} {
	max-width:140px;
	font-size:0.7rem;
}
${MEDIA_QUERY_SM} {
	max-width:90px;
	height:40px;
	font-size:0.6rem;
	line-height:40px;
}
`

const Arrow = styled.div `
width:10px;
height:10px;
background-color:grey;
-webkit-clip-path:polygon(0 40%, 50% 85%, 100% 40%, 100% 55%, 50% 100%, 0 55%);
transform:rotate(-90deg);
`


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

const Menswear = styled.div ``

const Womenswear = styled.div ``

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
${MEDIA_QUERY_MD} {
	max-width:350px;
	height:40px;
}
${MEDIA_QUERY_SM} {
	max-width:300px;
	height:40px;
}
`
const MoreDetail = styled.div ``


export default function Sell () {
	const dispatch = useDispatch()
	const photoAmount = [0, 1, 2, 3, 4, 5]
	const [dropdownActive, setDropdownActive] = useState(false)
	const [designers, setDesigners] = useState([])
	const [sizes, setSizes] = useState([])
	const [conditions, setConditions] = useState([])
	const [categories, setCategories] = useState([])
	const [subCategories, setSubCategories] = useState([])
	const dropdownRef = useRef(null)
	const [departmentAndCategory, setDepartmentAndCategory] = useState('Department / Category')
	const account = useSelector(accountSelector)
	const [sellInput, setSellInput] = useState({
		subCategory:'Sub-Category',
		designer:'Designer',
		size:'Size',
		itemName:'Item Name',
		price: '',
		color:'Designer Color Name, i.e. "Frozen Yellow"',
		condition:'Condition',
		description:'Add details about conditions, how the garments fits, additional measurements, etc.'
	})
	const [draftAlertActive, setDraftdraftAlertActive] = useState(false)
	const [createAlertActive, setCreateAlertActive] = useState(false)
	const CategoryRef = useRef()
	const SubCategoryRef = useRef()
	const designerRef = useRef()
	const sizeRef = useRef()
	const conditionRef = useRef()
	const dataRef = useRef({
		department_id:null,
		category_id:null,
		subCategory_id:null,
		designer_id:null,
		SizeId:null,
		color:null,
		price:null,
		condition_id:null,
		itemName:null,
		description:null,
		image_1:null,
		image_2:null,
		image_3:null,
		image_4:null,
		image_5:null,
		image_6:null,
		user_id:localStorage.getItem('userId')
	})

	useEffect(() => {
		getDesigner(setDesigners)
		getSize(setSizes)
		getCondition(setConditions)
		getCategory(setCategories)
		getSubCategory(setSubCategories)


		const release = (e) => {
			if (CategoryRef.current !== null &&
				SubCategoryRef.current !== null) {
				if (!CategoryRef.current.contains(e.target) &&
				!SubCategoryRef.current.contains(e.target)) {
					setDropdownActive(false)
				}
			}
		}
		
		document.addEventListener('mousedown', release)
	},[])
	

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


	const onOption = () => {
		setDropdownActive(!dropdownActive)
	}

	const onCategoryChoose = (e, department, categoryName, department_id, category_id, key) => {
		e.stopPropagation()
		dataRef.current.department_id = department_id
		dataRef.current.category_id = category_id
		setDepartmentAndCategory(`${department} / ${categoryName}`)
		setDropdownActive(false)
		const Map = getMap(dropdownRef)
		const Node = Map.get(key)
		Node.style.display = 'none'
	}
	
	const onDepartmentClick = key => {
		const categoryMap = getMap(dropdownRef)
		const categoryNode = categoryMap.get(key)
		categoryNode.style.display = 'block'	
	}

	const onItenNameChange = e => {
		setSellInput({...sellInput, itemName:e.target.value})
		dataRef.current.itemName = e.target.value
	}

	const onPriceChange = e => {
		setSellInput({...sellInput, price:e.target.value})
		dataRef.current.price = e.target.value
	}

	const onColorChange = e => {
		setSellInput({...sellInput, color:e.target.value})
		dataRef.current.color = e.target.value
	}

	const onSaveDraft = () => {
		setDraftdraftAlertActive(true)
		Object.entries(dataRef.current).forEach(data => localStorage.setItem(data[0], data[1]))
	}

	const onDescriptionChange = e => {
		setSellInput({...sellInput, description:e.target.value})
		dataRef.current.description = e.target.value
	}

	const onSubmit = (e) => {
		e.preventDefault()

		if (!localStorage.getItem('userId')) {
			dispatch(openLoginForm())
		} else {
			const formData = new FormData()
			Object.entries(dataRef.current).forEach(data => {
				if (data[0].indexOf('image') !== -1) {
					formData.append('images', data[1])
				} else {
					formData.append(data[0], data[1])
				}
			})
			
			createListing(formData)
			setCreateAlertActive(true)
		}
	}

	const onBackgroundClick = () => {
		setDraftdraftAlertActive(false)
		setCreateAlertActive(false)
		dispatch(openLoginForm(true))
	}

	return (
		<>
			{account.isLoginFormOpen ? <BlackBackground onBackgroundClick={onBackgroundClick}/> : null}
			<AccountForm />
			<PopUpBox width='300px' active={draftAlertActive}>
				Draft Saved Successfully
			</PopUpBox>
			<PopUpBox width='300px' active={createAlertActive}>
				Created Successfully
			</PopUpBox>
			{draftAlertActive ? <BlackBackground onBackgroundClick={onBackgroundClick}/> : null }
			{createAlertActive ? <BlackBackground onBackgroundClick={onBackgroundClick}/> : null }
			<Header />
			<Navbar />
			<SellWrapper>
				<Head>
					<Title>Add a New Listing</Title>
				</Head>
				<Body>
					<Details>
						<SectionTitle>Details</SectionTitle>
						<GridWrapper>
							<Detail onClick={onOption} ref={CategoryRef}>{departmentAndCategory}
								<DepartmentAndCategory dropdownActive={dropdownActive}>
									<Option onClick={() => onDepartmentClick('menswearCategory')}><Menswear>Menswear</Menswear><Arrow/></Option>
									<Option onClick={() => onDepartmentClick('womenswearCategory')}><Womenswear>Womenswear</Womenswear><Arrow/></Option>
								</DepartmentAndCategory>
								<Dropdown ref={node => getNode(node, 'menswearCategory', dropdownRef)}>
									{categories
									.filter(category => category.department_id === 1)
									.map(category => 
									<Option key={category.id} onClick={e => onCategoryChoose(e, 'Menswear', category.name, category.department_id, category.id, 'menswearCategory')}>
										{category.name}
									</Option>)}
								</Dropdown>
								<Dropdown ref={node => getNode(node, 'womenswearCategory', dropdownRef)}>
										{categories
										.filter(category => category.department_id === 2)
										.map(category => 
										<Option key={category.id} onClick={e => onCategoryChoose(e, 'Womenswear',category.name , category.department_id, category.id, 'womenswearCategory')}>
											{category.name}
										</Option>)}
								</Dropdown>
							</Detail>
							<SellPageDropdown reference={SubCategoryRef} sellInput={sellInput} categories={subCategories} dataRef={dataRef} setSellInput={setSellInput} indicator='subCategory'/>
							<SellPageDropdown reference={designerRef} sellInput={sellInput} categories={designers} dataRef={dataRef} setSellInput={setSellInput} indicator='designer'/>
							<SellPageDropdown reference={sizeRef} sellInput={sellInput} categories={sizes} dataRef={dataRef} setSellInput={setSellInput} indicator='size'/>
						</GridWrapper>
					</Details>
					<GridWrapper>
						<SellPageInput change={onItenNameChange} title='Item Name' placeholder='Item Name' value={sellInput.itemName}/>
						<SellPageInput change={onColorChange} title='Color' placeholder='Designer Color Name, i.e. "Frozen Yellow"'/>
						<MoreDetail>
							<SectionTitle>Condition</SectionTitle>
							<SellPageDropdown reference={conditionRef} sellInput={sellInput} categories={conditions} dataRef={dataRef} setSellInput={setSellInput} indicator='condition'/>
						</MoreDetail>
						<SellPageInput change={onPriceChange} title='Price' placeholder=''/>
					</GridWrapper>
					<Description>
						<SectionTitle>Description</SectionTitle>
						<DescriptionInput onChange={onDescriptionChange}  placeholder='Add details about conditions, how the garments fits, additional measurements, etc.'/>
					</Description>
				</Body>
				<PhotoUploadSection>
					<Photo>
						{photoAmount.map(photo => <PhotoWrapperSection photo={photo} dataRef={dataRef} key={photo}/>)}
					</Photo>
				</PhotoUploadSection>
				<FooterWrapper>
					<Draft onClick={onSaveDraft}>SAVE AS DRAFT</Draft>
					<Submit defaultValue='PUBLISH' type='submit' onClick={onSubmit}></Submit>
				</FooterWrapper>
			</SellWrapper>
		</>
	)
}