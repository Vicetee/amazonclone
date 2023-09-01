import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    userInfo: null
}

export const amazonSlice = createSlice({
    name: "amazon",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = state.products.find((item) => item.id === action.payload.id)
            if(item) {
                item.quantity += action.payload.quantity
            } else{
                state.products.push(action.payload)
            }
        },
        increaseQuantity: (state, action) => {
            const item = state.products.find((item) => item.id === action.payload)
            item.quantity++
        },
        decreaseQuantity: (state, action) => {
            const item = state.products.find((item) => item.id === action.payload)
            if(item.quantity === 1) {
                item.quantity = 1
            } else {
                item.quantity--
            }
        },
        // Delete items from cart
        deleteItem: (state, action) => {
            state.products = state.products.filter((item) => item.id !== action.payload)
        },
        // Reset cart to initial state
        resetCart: (state) => {
            state.products = []
        },
        // Products Reducers end here
        // UserInfo Reducers start here
        // User Authentication
        setUserInfo: ( state, action ) => {
            state.userInfo = action.payload
        }, 
        userSignout: ( state ) => {
            state.userInfo = null;
        }
        // UserInfo Reducers end here
    },
});

export const {
    addToCart,
    deleteItem,
    resetCart,
    increaseQuantity,
    decreaseQuantity,
    setUserInfo,
    userSignout
} = amazonSlice.actions;

export default amazonSlice.reducer
