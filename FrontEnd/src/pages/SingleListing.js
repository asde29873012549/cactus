import React, {useEffect, useState, useRef} from 'react'
import {useParams} from 'react-router-dom'
import {getSingleListing, getFilteredListing, createChatroom, sendMessage, getAllMessages, getChatroom, updateLastMessage} from '../WebAPI'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import MessageBox from '../components/MessageBox'
import ListingWrapper from '../components/ListingWrapper'
import MoreFromThisDesigner from '../components/MoreFromThisDesigner'
import {addToCart, likeAListing} from '../WebAPI'
import {BlackBackground, PopUpBox} from '../components/utils'
import AccountForm from '../components/LoginLogout'
import {accountSelector, openLoginForm} from '../redux/accountSlice'
import {useSelector, useDispatch} from 'react-redux'





export default function SingleListing () {
	const {id} = useParams()
	const [listingData, setListingData] = useState([{}])
	const [filteredListing, setFilteredListing] = useState([])
	const [isLiked, setIsLiked] = useState(false)
	const [chatroomActive, setChatroomActive] = useState(false)
	const [inputValue, setInputValue] = useState('')
	const [messageData, setMessageData] = useState([{}])
	const [popUpBoxActive, setPopupBoxActive] = useState(false)
	const chatroomRef = useRef(null)
	const userId = Number(localStorage.getItem('userId'))
	const messageBoxRef = useRef(null)
	const account = useSelector(accountSelector)
	const dispatch = useDispatch()

	//Extract Listing Image and Info from listingData state
	const listingImage = Object.entries(listingData[0]).filter(data => data[0].indexOf('image') >= 0)
	const listingInfo = Object.fromEntries(Object.entries(listingData[0]).filter(data => data[0].indexOf('image') < 0))


	useEffect(() => {
		//get the Lisitng & lisintgs from curent desingers
		getSingleListing(id, setListingData)
		getFilteredListing(setFilteredListing, `designer=${listingInfo.designer_id}`)

		//Release onClick outside
		const release = (e) => {
			if (messageBoxRef.current !== null) {
				if (!messageBoxRef.current.contains(e.target)) {
					setChatroomActive(false)
				}
			}
		}
		
		document.addEventListener('mousedown', release)

	},[id, listingInfo.designer_id])

	//Handle Like icon clickes
	const onLike = () => {
		likeAListing(id, localStorage.getItem('userId'), setIsLiked, isLiked)
		setIsLiked(!isLiked)
	}

	//Handle message seller
	const onMessage = async () => {
		if (!userId) {
			dispatch(openLoginForm())
		} else {
			await getChatroom(listingData[0].id, listingData[0].user_id, chatroomRef)
			if (chatroomRef.current) {
				
				await getAllMessages(chatroomRef.current.id, setMessageData)
			} else {
				await createChatroom(userId, listingData[0].user_id, listingData[0].id)
				
			} 
			setChatroomActive(true)
		}
	}

	//Handle typein messages
	const onInput = e => {
		setInputValue(e.target.value)
	}

	//Handle sending Messages
	const onSend = e => {
		if (e.key === 'Enter') {
			sendMessage(inputValue, setMessageData, messageData, Number(userId), chatroomRef.current.id)
			setInputValue('')
		}
		updateLastMessage(userId, inputValue, chatroomRef.current.id)
	}

	//Handle adding lisitng to cart
	const onAddToCart = () => {
		if (!userId) {
			dispatch(openLoginForm())
		} else {
			setPopupBoxActive(true)
			addToCart(id, userId)
		}
	}

	//handle clicking background to release
	const onBackgroundClick = () => {
		setPopupBoxActive(false)
		dispatch(openLoginForm(true))
	}

	return (
		<>
			{account.isLoginFormOpen ? <BlackBackground onBackgroundClick={onBackgroundClick}/> : null}
			<AccountForm />
			<>
				<PopUpBox width='300px' active={popUpBoxActive}>
					Add To Cart Successfully
				</PopUpBox>
				{popUpBoxActive ? <BlackBackground active={popUpBoxActive} onBackgroundClick={onBackgroundClick}/> : null }
			</>
			<Header />
			<Navbar />
			<ListingWrapper listingImage={listingImage} listingInfo={listingInfo} onAddToCart={onAddToCart} onLike={onLike} onMessage={onMessage} isLiked={isLiked}/>
			<MoreFromThisDesigner filteredListing={filteredListing}/>
			{chatroomActive ? 
				<MessageBox onInput={onInput} onSend={onSend} messageData={messageData} inputValue={inputValue} messageBoxRef={messageBoxRef}/>
			: null}
			
		</>
	)
}