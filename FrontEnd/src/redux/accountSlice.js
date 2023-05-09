import { createSlice } from '@reduxjs/toolkit';


let initialState = {
	isLogin:false,
	isLoginFormOpen:false,
	isRegisterActive:false,
	userInfo:{
		username:''
	},
	profileUpdateActive:false
}

const accountSlice = createSlice({
	name:'account',
	initialState,
	reducers:{
		handleLogin:state => {
			state.isLogin = true
		},
		handleLogout:state => {
			state.isLogin = false
			state.userInfo.username = ''
		},
		openLoginForm:(state, action) => {
			action.payload ? state.isLoginFormOpen = false : state.isLoginFormOpen = !state.isLoginFormOpen
		},
		switchLoginToRegister:(state) => {
			state.isRegisterActive = !state.isRegisterActive
		},
		storeUser:(state, action) => {
			state.userInfo.username = action.payload.username
		},
		setProfileUpdateActive:(state) => {
			state.profileUpdateActive = !state.profileUpdateActive
		}
	}
})

export const {openLoginForm, closeLoginForm, switchLoginToRegister, handleLogin, handleLogout, storeUser, setProfileUpdateActive} = accountSlice.actions
export const accountSelector = state => state.account
export default accountSlice.reducer


