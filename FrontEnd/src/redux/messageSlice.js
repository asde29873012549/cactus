import { createSlice } from '@reduxjs/toolkit';


const initialState = {
	messageActive:true,
	myItemsActive:false,
	myProfileActive:false,
	myShippingActive:false,
	settingsActive:false
}

const messageSlice = createSlice({
	name:'message',
	initialState,
	reducers:{
		setSidebarCategoryActive : (state, action)=> {
			state[action.payload[0]] = true
			state[action.payload[1]] = false
			state[action.payload[2]] = false
			state[action.payload[3]] = false
			state[action.payload[4]] = false
		}
		
	}
})

export const {
	setSidebarCategoryActive
} = messageSlice.actions
export const messageSelector = state => state.message
export default messageSlice.reducer


