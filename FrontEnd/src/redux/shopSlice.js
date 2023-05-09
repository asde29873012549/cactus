import { createSlice } from '@reduxjs/toolkit';


let initialState = {
	sidebar:{
		department:true,
		category:false,
		menswearSubCategory:false,
		womenswearSubCategory:false,
		size:false,
		designer:false,
		price:false,
		condition:false
	},
	listing:[],
	filter:[],
	likes:null,
	mobileCategorySectionActive:false
}

const shopSlice = createSlice({
	name:'shop',
	initialState,
	reducers:{
		openDepartment:state => {
			state.sidebar.department = !state.sidebar.department
		},
		openCategory:state => {
			state.sidebar.category = !state.sidebar.category
		},
		openSize:state => {
			state.sidebar.size = !state.sidebar.size
		},
		openDesigner:state => {
			state.sidebar.designer = !state.sidebar.designer
		},
		openPrice:state => {
			state.sidebar.price = !state.sidebar.price
		},
		openCondition:state => {
			state.sidebar.condition = !state.sidebar.condition
		},
		addFilter:(state, action) => {
			state.filter.push(action.payload)
		},
		removeFilter:(state, action) => {
			for (let i = 0 ; i < state.filter.length ; i++) {
				if (state.filter[i] === action.payload) {
					state.filter.splice(i, 1)
				}
			}
		},
		clearFilter:(state) => {
			state.filter = []
		},
		likePressed:(state) => {
			state.likes ++
		},
		getAllFilteredListing:(state, action) => {
			if (action.payload.length > 0) {
				state.listing = []
				for (let listing of action.payload) {
					state.listing.push(listing)
				}
			} else {
				state.listing = []
			}
			
		},
		openMobileCategory:(state) => {
			state.mobileCategorySectionActive = !state.mobileCategorySectionActive
		}
	}
})

export const {
	openDepartment,
	openCategory,
	openSize,
	openDesigner,
	openPrice,
	openCondition,
	addFilter,
	removeFilter,
	likePressed,
	clearFilter,
	getAllFilteredListing,
	openMobileCategory
} = shopSlice.actions
export const shopSelector = state => state.shop
export default shopSlice.reducer


