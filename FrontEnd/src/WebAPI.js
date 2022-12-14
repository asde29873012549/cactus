import {LogoutAction, LoginAction} from './components/utils'


const getListing = async (id, setter) => {
	const result = await fetch(`http://localhost:5001/shop/${id}`)
	const data = await result.json()
	setter(() => {
		let newListing = []
		data.forEach(data => newListing.push(data))
		return newListing
	})
}

const getFilteredListing = async (setter, endpoint, dispatch) => {
	const result = await fetch(`http://localhost:5001/filter?${endpoint}`)
	const data = await result.json()
	if (dispatch) {
		dispatch(setter(data))
	} else {
		setter(() => {
			let newListing = []
			data.forEach(listing => newListing.push(listing))
			return newListing
		})
	}
}

const getDesigner = async (setter) => {
	const result = await fetch('http://localhost:5001/designers')
	const data = await result.json()
	setter(() => {
		let newDesigners = []
		data.forEach(designer => newDesigners.push(designer))
		return newDesigners
	})
}

const getSize = async (setter) => {
	const result = await fetch('http://localhost:5001/size')
	const data = await result.json()
	setter(() => {
		let newSizes = []
		data.forEach(size => newSizes.push(size))
		return newSizes
	})
}

const getDepartment = async (setter) => {
	const result = await fetch('http://localhost:5001/departments')
	const data = await result.json()
	setter(() => {
		let newDepartments = []
		data.forEach(department => newDepartments.push(department))
		return newDepartments
	})
}

const getCondition = async (setter) => {
	const result = await fetch('http://localhost:5001/condition')
	const data = await result.json()
	setter(() => {
		let newCondition = []
		data.forEach(condition => newCondition.push(condition))
		return newCondition
	})
}

const getCategory = async (setter) => {
	const result = await fetch('http://localhost:5001/categories')
	const data = await result.json()
	setter(() => {
		let newCategories = []
		data.forEach(category => newCategories.push(category))
		return newCategories
	})
}

const getSubCategory = async (setter) => {
	const result = await fetch('http://localhost:5001/subCategories')
	const data = await result.json()
	setter(() => {
		let newSubCategories = []
		data.forEach(subcategory => newSubCategories.push(subcategory))
		return newSubCategories
	})
}

const createListing = async (formData) => {
	await fetch('http://localhost:5001/sell/uploadListing', {
		method:'POST',
		body:formData
	})
}

const getSingleListing = async (id, setter) => {
	const result = await fetch(`http://localhost:5001/shop/listing/${id}`)
	const data = await result.json()
	setter(prev => data)
}

const registerUser = async (userData) => {
	await fetch('http://localhost:5001/register', {
		method:'POST',
		body:JSON.stringify(userData),
		headers:{'Content-type':'application/json'}
	})
}

const loginUser = async (userData, dispatch, storeUser) => {
	const result = await fetch('http://localhost:5001/login', {
		method:'POST',
		body:JSON.stringify(userData),
		headers:{'Content-type':'application/json'}
	})
	const data = await result.json()
	dispatch(storeUser({
		username:data.username
	}))
	LoginAction.setIsAuth(data.isAuthn)
	LoginAction.setToken(data.token)
	LoginAction.setUsername(data.username)
	LoginAction.setUserId(data.userId)
}

const getMe = async(token, refresh, dispatch, loginAction, logoutAction, storeUser) => {
	const result = await fetch('http://localhost:5001/getMe', {
		method:'GET',
		headers:{authorization: `Bearer ${token}`}
	})
	if (result.status !== 401 && result.status !== 403) {
		const data = await result.json()
		dispatch(loginAction())
		dispatch(storeUser({
			username:data.username
		}))
	} else {
		const refreshToken = {
			refreshToken:refresh
		}
		const result = await fetch('http://localhost:5001/token', {
			method:'POST',
			body:JSON.stringify(refreshToken),
			headers:{'Content-type':'application/json'}
		})
		if (result.status === 401 || result.status === 403) {
			dispatch(logoutAction())
			LogoutAction.clearIsAuth()
			LogoutAction.clearToken()
			LogoutAction.clearUsername()
			LogoutAction.clearUserId()
			LogoutAction.clearTokenCookie()
			LogoutAction.clearIsAuthCookie()
			LogoutAction.clearUsernameCookie()
			LogoutAction.clearUserIdCookie()
		} else {
			const data = await result.json()

			await fetch('http://localhost:5001/getMe', {
				method:'GET',
				headers:{authorization: `Bearer ${data.accessToken}`}
			})
			dispatch(loginAction())
			dispatch(storeUser({
				username:data.username
			}))
			LoginAction.setIsAuth(data.accessToken)
			LoginAction.setIsAuthCookie(data.accessToken)
		}
	}
}

const getUserChatroom = async (userId, setter) => {
	const result = await fetch(`http://localhost:5001/getUserChatroom/${userId}`)
	const data = await result.json()
	
	setter(() => {
		let messages = []
		data.forEach(message => messages.push(message))
		return messages
	})
}

const getAllMessages = async (id, setter) => {
	const result = await fetch(`http://localhost:5001/getAllMessages/${id}`)
	const data = await result.json()
	await setter(() => {
		let messageData = []
		data.forEach(message => messageData.push(message))
		return messageData
	})
}

const sendMessage = async (inputValue, setter, initialValue, userId, chatroomId) => {
	const result = await fetch('http://localhost:5001/createMessage', {
		method:'POST',
		body:JSON.stringify({inputValue, userId, chatroomId}),
		headers:{'Content-type':'application/json'}
	})
	const data = await result.json()
	setter(() => [...initialValue, data])
}

const getAllEmoji = async (key, setter, emojiRef) => {
	const result = await fetch(`https://emoji-api.com/emojis?access_key=${key}`)
	const data = await result.json()
	setter(data)
	emojiRef.current = data
}

const createChatroom = async (user, receiver, listing) => {
	await fetch('http://localhost:5001/createChatroom', {
		method:'POST',
		body:JSON.stringify({sender_id:user, receiver_id:receiver, listing_id:listing, last_message:null, last_message_sender_id:null}),
		headers:{'Content-type':'application/json'}
	})
}

const getChatroom = async (listing, user, ref) => {
	const result = await fetch('http://localhost:5001/getChatroom', {
		method:'POST',
		body:JSON.stringify({listing_id:listing, user_id:user}),
		headers:{'Content-type':'application/json'}
	})
	const data = await result.json()
	ref.current = await data
}

const updateLastMessage = async (user, message, chatroomId) => {
	await fetch('http://localhost:5001/updateLastMessage', {
		method:'POST',
		body:JSON.stringify({user, message, chatroomId}),
		headers:{'Content-type':'application/json'}
	})
}

const getUserProfile = async (id, setter) => {
	const result = await fetch(`http://localhost:5001/getUserProfile/${id}`)
	const data = await result.json()
	setter(data)
}

const getUserItems = async (id, setter) => {
	const result =await fetch(`http://localhost:5001/getUserItems/${id}`)
	const data = await result.json()
	setter(data)
}

const likeAListing = async (ListingId, user_id, setter, state) => {
	await fetch('http://localhost:5001/likeAListing', {
		method:'POST',
		body:JSON.stringify({ListingId, user_id}),
		headers:{'Content-type':'application/json'}
	})
	setter(!state)
}

const getUserFavoriteItems = async (id, setter) => {
	const result = await fetch(`http://localhost:5001/getUserFavoriteItems/${id}`)
	const data = await result.json()
	setter(data)
}

const updateProfile = async (id, username, email, bio) => {
	await fetch(`http://localhost:5001/updateProfile/${id}`, {
		method:'POST',
		body:JSON.stringify({username, email, bio}),
		headers:{'Content-type':'application/json'}
	})
}

const getSingleDesinger = async (id, setter, dispatch) => {
	const result = await fetch(`http://localhost:5001/getSingleDesigner/${id}`)
	const data = await result.json()
	dispatch(setter(data))
}

const getStaffPicksListing = async (setter) => {
	const result = await fetch('http://localhost:5001/getStaffPicksListing')
	const data = await result.json()
	setter(data)
}

const addToCart = async (id, userId) => {
	await fetch(`http://localhost:5001/addToCart/${id}`, {
		method:'POST',
		body:JSON.stringify({id:userId}),
		headers:{'Content-type':'application/json'}
	})
}

const removeFromCart = async (id, userId) => {
	await fetch(`http://localhost:5001/removeFromCart/${id}`, {
		method:'POST',
		body:JSON.stringify({id:userId}),
		headers:{'Content-type':'application/json'}
	})
}

const getUserShoppingCart = async (id, setter) => {
	const result = await fetch(`http://localhost:5001/getUserShoppingCart/${id}`)
	const data = await result.json()
	setter(data)
}

const getTrendingItems = async (setter) => {
	const result = await fetch('http://localhost:5001/getTrendingItems')
	const data = await result.json()
	setter(data)
}

const submitOrder = async (ItemName, MerchantTradeDate, MerchantTradeNo, TotalAmount, TradeDesc) => {

	const result = await fetch('http://localhost:5001/paymentResult', {
		method:'POST',
		body:JSON.stringify({
			ItemName,
			MerchantTradeDate,
			MerchantTradeNo,
			TotalAmount,
			TradeDesc}),
		headers:{'Content-type':'application/json'}
	})

	const data = await result.blob()
  	const blobUrl = URL.createObjectURL(data);
  	window.open(blobUrl, 'turn')
}

const changeUserAvatar = async (formData, id) => {

	for (var key of formData.entries()) {
		console.log(key[0] + ', ' + key[1]);
	}

	await fetch(`http://localhost:5001/changeUserAvatar/${id}`, {
		method:'POST',
		body:formData
	})
}

export {
	getListing, 
	getFilteredListing, 
	getDesigner, 
	getSize, 
	getDepartment, 
	getCondition, 
	getCategory, 
	getSubCategory, 
	createListing, 
	getSingleListing, 
	registerUser,
	loginUser,
	getMe,
	getUserChatroom,
	getAllMessages,
	sendMessage,
	getAllEmoji,
	createChatroom,
	getChatroom,
	updateLastMessage,
	getUserProfile,
	getUserItems,
	likeAListing,
	getUserFavoriteItems,
	updateProfile,
	getSingleDesinger,
	getStaffPicksListing,
	addToCart,
	getUserShoppingCart,
	getTrendingItems,
	removeFromCart,
	submitOrder,
	changeUserAvatar
}