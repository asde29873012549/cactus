import { configureStore } from '@reduxjs/toolkit';
import accountReducer from '../redux/accountSlice';
import shopReducer from '../redux/shopSlice'
import messageReducer from '../redux/messageSlice'
import designerReducer from '../redux/designerSlice'

export const store = configureStore({
	reducer:{
		account:accountReducer,
		shop:shopReducer,
		message:messageReducer,
		designer:designerReducer

	}
});
