import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addItem(state, action) {
      state.push(action.payload);
    },
    removeItem(state, action) {
      let itemId = action.payload;
      let newProducts = state.filter(
        (cartProducts) => cartProducts.id !== itemId
      );
      return newProducts;
    },
  },
});

export default cartSlice.reducer;

export let { addItem, removeItem } = cartSlice.actions;
