import { createSlice } from "@reduxjs/toolkit";

const dataFromWeb = JSON.parse(localStorage.getItem("cart"));

const cartSlice = createSlice({
  name: "cart",
  initialState: dataFromWeb,
  reducers: {
    addItem(state, action) {
      state.push(action.payload);
      localStorage.setItem("cart", JSON.stringify([...state]));
    },
    removeItem(state, action) {
      let itemId = action.payload;
      let newProducts = state.filter(
        (cartProducts) => cartProducts.id !== itemId
      );
      localStorage.setItem("cart", JSON.stringify([...newProducts]));
      return newProducts;
    },
  },
});

export default cartSlice.reducer;

export let { addItem, removeItem } = cartSlice.actions;
