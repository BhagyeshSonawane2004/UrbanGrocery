// In your productSlice.js file

import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  productList: [],
  cartItem: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      state.productList = [...action.payload];
    },
    addCartItem: (state, action) => {
      const check = state.cartItem.some((el) => el._id === action.payload._id);
      console.log(check);
      if (check) {
        toast("Item already in the cart");
      } else {
        toast("Item added successfully");
        const total = action.payload.price;

        state.cartItem.push({ ...action.payload, qty: 1, total: total });
      }
    },
    deleteCartItem: (state, action) => {
      toast("Item deleted");
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      if (index !== -1) {
        state.cartItem.splice(index, 1);
      }
    },
    increaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      if (index !== -1) {
        state.cartItem[index].qty += 1;
        state.cartItem[index].total = state.cartItem[index].price * state.cartItem[index].qty;
      }
    },
    decreaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      if (index !== -1 && state.cartItem[index].qty > 1) {
        state.cartItem[index].qty -= 1;
        state.cartItem[index].total = state.cartItem[index].price * state.cartItem[index].qty;
      }
    },
  },
});

export const {
  setDataProduct,
  addCartItem,
  deleteCartItem,
  increaseQty,
  decreaseQty,
} = productSlice.actions;

export default productSlice.reducer;
