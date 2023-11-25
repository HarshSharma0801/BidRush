import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./reducers/CartSlice";
import CartUI from "./reducers/CartUI";

const store = configureStore({
    reducer:{CartUI:CartUI.reducer , CartSlice:CartSlice.reducer}
})

export default store