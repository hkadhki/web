import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    basket: [],
}
export const basketSlice = createSlice({
    name: '@@basket',
    initialState,
    reducers: {
        addBasket: (state, action) => {
              const existingProduct = state.basket.find((item) => item.id === action.payload.id);
  if (existingProduct) {
    existingProduct.qty = action.payload.qty; 
  } else {
    state.basket = [...state.basket, action.payload]; 
  }
        },
        removeBasket: (state, action) => {
            state.basket = state.basket.filter((product) => product.id !== action.payload.id)
        }
    }
});

export const basketReducer = basketSlice.reducer;
export const {addBasket, removeBasket} = basketSlice.actions;

//selector

export const selectBasket = (state) => state.basket.basket;