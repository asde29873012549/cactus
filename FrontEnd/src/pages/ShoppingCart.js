import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import SingleOrderSection from '../components/SingleOrderSection'
import {getUserShoppingCart, getUserProfile, submitOrder} from '../WebAPI.js'
import {customAlphabet} from 'nanoid'
import {format} from 'date-fns'
import {MEDIA_QUERY_SM, MEDIA_QUERY_MD} from '../breakpoints'

const ShoppingCartWrapper = styled.div `
display:flex;
width:80%;
margin:60px auto;
justify-content:space-between;
align-items:flex-start;
${MEDIA_QUERY_MD} {
	flex-direction:column;
}
${MEDIA_QUERY_SM} {
	flex-direction:column;
}
`

const ListingSection = styled.div `
width:700px;
${MEDIA_QUERY_MD} {
	margin-bottom:30px;
	max-width:80vw;
}
${MEDIA_QUERY_SM} {
	margin-bottom:30px;
	max-width:80vw;
}
`

const OrderInfoSection = styled.form `
width:300px;
display:flex;
justify-content:center;
flex-direction:column;
align-items:flex-start;

`

const ListingWrapper = styled.div `
display:flex;
flex-direction:column;
width:100%;
`


const OrderCalculation = styled.div `
height:60px;
width:100%;
padding:30px 0;
padding-left:100px;
box-sizing:border-box;
`

const OrderDetail =styled.div `
display:flex;
justify-content:space-between;
`

const Detail = styled.div `
font-size:0.7rem;
`

const OrderTotalDetail = styled(OrderDetail) `
font-weight:900;
`

const ShippingAddressWrapper = styled.div `
display:flex;
flex-direction:column;
width:100%;
${MEDIA_QUERY_MD} {
	align-items:center;
}
${MEDIA_QUERY_SM} {
	align-items:center;
}
`

const Title = styled.div `
font-size:0.9rem;
font-weight:900;
margin:20px 0;
`

const Address = styled.div `
font-size:0.9rem;
`

const AddressInput = styled.input `
font-size:0.7rem;
width:100%;
height:28px;
border-radius:6px;
border:0.5px solid rgb(180, 180, 180);
margin:10px 0;
padding:0 10px;
`

const CheckboxWrapper = styled.div `
display:flex;
align-items:center;
margin:4px 0;
font-size:0.9rem;
`

const Check = styled.input `
text-align:center;
`

const SectionTitle = styled.div `
font-size:0.7rem;
letter-spacing:2px;
color:rgba(0,0,0,0.7);
width:100%;
margin:15px 0;
`

const CardInfoInput = styled.input `
width:100%;
height:30px;
border:1px solid rgb(210, 210, 210);
box-sizing:border-box;
padding:0 10px;
color:rgb(230, 230, 230);
`

const SecurityCodeInput = styled(CardInfoInput) `
width:90%;
`

const CreditcardDetail = styled.div `
width:100%;
`

const CreditCardWrapper = styled.div `
display:flex;
`

const SubmitButton = styled.div `
width:140px;
height:40px;
background-color:#1C1C1C;
color:white;
border-radius:5px;
line-height:40px;
text-align:center;
margin-top:40px;
border:0;
font-size:0.9rem;
&:hover {
	background-color:white;
	color:#1C1C1C;
	border:1.5px solid #1C1C1C;
	cursor:pointer;
}
`

const PriceDetail = styled(Detail) `
&::before {
	content:'$'
}
`
//Wrap Constant detail title in an array
const detail = [['Total', null], ['Duties & Taxes', 300]]

//Wrap Constant ShppongCart Info Title in an array
const address = ['shippingName', 'address', 'city', 'nation']

//Wrap Payment Methods in an Array
const paymentMethod = ['Credit Card', 'Apple Pay', 'Paypal']

export default function ShoppingCart () {
	const userId = localStorage.getItem('userId')
	const [userShoppingCart, setUserShoppingCart] = useState([])
	const [userProfile, setUserProfile]= useState({})
	const [total, setTotal] =useState(0)
	const [isUserLoggedin, setIsUserLoggedin] = useState(false)

	useEffect(() => {
		//check if User is logged-in
		if (userId) {
			setIsUserLoggedin(true)
			//get user shopping cart datas
			getUserShoppingCart(userId, setUserShoppingCart)
			//get user profile
			getUserProfile(userId, setUserProfile)
		} else {
			setIsUserLoggedin(false)
		}
	}, [userId])

	useEffect(() => {
		//Caculate current shoppingCart total
		if (userShoppingCart.length > 0) {
			let price = 0
			for (let listing of userShoppingCart) {
				setTotal(price += listing.price)
			}
		}
	}, [userShoppingCart])

	//on Submitting order
	const onSubmitOrder = () => {
		const date = Date()
		const d = new Date(date)
		const dateTime = format(new Date(d.getFullYear(),(d.getMonth()),d.getDate(),d.getHours(), d.getMinutes(),d.getSeconds()),'yyyy/MM/dd HH:mm:ss')
		const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', 20)
		const orderId = nanoid()
		let itemName = ''
		userShoppingCart.forEach(listing => {
			itemName += `${listing.itemName}#`
		})

		//Take customer to EC pay
		submitOrder(itemName, dateTime, orderId, `${total+300}`, itemName)
	}
	
	
	return (
		<>
			<Header />
			<Navbar />
			<ShoppingCartWrapper>
				<ListingSection>
					<ListingWrapper>
						{userShoppingCart.map(listing => <SingleOrderSection key={`${listing.ListingId}:${listing.index}`} listing={listing} setter={setUserShoppingCart}/>)}
						<OrderCalculation>
							{detail.map(detail => 
								<OrderDetail key={detail}>
									<Detail>{detail[0]}</Detail>
									<PriceDetail>{detail[1] ? 300 : total}</PriceDetail>
								</OrderDetail>
							)}
							<OrderTotalDetail>
								<Detail>Order Total</Detail>
								<PriceDetail>{total+300}</PriceDetail>
							</OrderTotalDetail>
						</OrderCalculation>
					</ListingWrapper>
				</ListingSection>
				<OrderInfoSection>
					<ShippingAddressWrapper>
						<Title>Shipping Address</Title>
						{
						address.map((address, index) => isUserLoggedin ? <Address key={`${address}:${index}`}>{userProfile[address]}</Address> : <AddressInput key={`${address}:${index}`} placeholder={address}/>
						)}
					</ShippingAddressWrapper>
					<ShippingAddressWrapper>
						<Title>Payment Method</Title>
						{paymentMethod.map((method, index) => <label  key={`${method}:${index}`}><CheckboxWrapper><Check type='checkbox' />{method}</CheckboxWrapper></label>)}
					</ShippingAddressWrapper>
					<ShippingAddressWrapper>
						<Title>Credit Card Details</Title>
						<CreditcardDetail>
							<SectionTitle>Card Number</SectionTitle>
							<CardInfoInput placeholder='1234 1234 1234 1234'/>
						</CreditcardDetail>
						<CreditcardDetail>
							<SectionTitle>Card Holder's Name</SectionTitle>
							<CardInfoInput/>
						</CreditcardDetail>
						<CreditCardWrapper>
							<CreditcardDetail>
								<SectionTitle>Expiration Date</SectionTitle>
								<SecurityCodeInput placeholder='MM/YY'/>
							</CreditcardDetail>
							<CreditcardDetail>
								<SectionTitle>Security Code</SectionTitle>
								<SecurityCodeInput placeholder='CVC'/>
							</CreditcardDetail>
						</CreditCardWrapper>
					</ShippingAddressWrapper>
					<SubmitButton onClick={onSubmitOrder}>Place the Order</SubmitButton>
				</OrderInfoSection>
			</ShoppingCartWrapper>
		</>	
	)
}