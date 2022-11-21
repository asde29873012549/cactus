import { createSlice } from '@reduxjs/toolkit';


let initialState = {
	designer:{}
}

const designerSlice = createSlice({
	name:'designer',
	initialState,
	reducers:{
		getSingleDesigner:(state, action) => {
			state.designer = action.payload
		}
	}
})

export const {
	getSingleDesigner
} = designerSlice.actions
export const designerSelector = state => state.designer
export default designerSlice.reducer


