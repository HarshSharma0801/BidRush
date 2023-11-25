import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    items:[],
    totalItems:0,
    totalPrice:0
}


const CartSlice = createSlice({
       
    name:'CartSlice',
    initialState:initialState,
    reducers:{ 
        setInitialData: (state, action) => {
        const data = action.payload;
        state.items = data.items;
        state.totalItems = data.totalItems;
        state.totalPrice = data.totalPrice;
      },
        AddtoCart(state,action){
             const newItem = action.payload;
             const existingItem = state.items.find(item=>item.id===newItem.id);
             state.totalItems++;
             state.totalPrice = Number(state.totalPrice) + Number(newItem.price);
             if(!existingItem){
                state.items.push({
                   id:newItem.id,
                   name:newItem.name,
                   price:newItem.price,
                   image:newItem.image,
                   quantity:1,
                  
                })
           }
           else{
               existingItem.quantity = existingItem.quantity+1
           }


        },
        removeFromCart(state,action){
            const id = action.payload
            const existingItem = state.items.find(item=>item.id===id)
            state.totalItems--
            state.totalPrice=Number(state.totalPrice)-Number(existingItem.price)
            if(existingItem.quantity === 1){
             state.items = state.items.filter(item=>item.id !== id)
            }
            else{
                existingItem.quantity = existingItem.quantity -1
            }
          

        }
    }
})

export const CartSliceActions = CartSlice.actions;

export default CartSlice