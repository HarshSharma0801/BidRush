import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isShown:false
}

const CartUI = createSlice({
    name:'CartUI',
    initialState:initialState,
    reducers:{
        CartUIShow(state){
          state.isShown = !state.isShown
        },
        
    }
})

export const CartUIActions = CartUI.actions;

export default CartUI
