import { createSlice } from "@reduxjs/toolkit";
import addedToCartToast from "../util/Toast/addedToCartToast";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //Actions
    hydrate: (state, action) => {
      return action.payload;
    },
    //Add item to cart
    addToCart: (state, action) => {
      const index = state.items.findIndex(
        (cartItem) => cartItem._id === action.payload._id
      );
      if (index >= 0) {
        let newCart = [...state.items];
        newCart[index] = {
          ...newCart[index],
          qty: newCart[index].qty + 1,
        };
        state.items = newCart;
      } else {
        let item = { ...action.payload };
        delete item.toast;
        state.items = [...state.items, item];
      }
      //Toast to indicate item added to cart
      if (action.payload.toast) {
        addedToCartToast(action.payload.image, action.payload.title);
      }
    },
    //Update the quantity of item in cart
    updateQty: (state, action) => {
      let newCart = [...state.items];
      const index = state.items.findIndex(
        (cartItem) => cartItem._id === action.payload._id
      );
      if (index >= 0) {
        if (action.payload.qty >= 1) {
          newCart[index] = action.payload;
          state.items = newCart;
        } else {
          newCart.splice(index, 1);
          state.items = newCart;
        }
      } else {
        console.warn("Dish not present in the cart!");
      }
    },
    //Remove a item from cart
    removeFromCart: (state, action) => {
      const index = state.items.findIndex(
        (cartItem) => cartItem._id === action.payload._id
      );
      let newBastek = [...state.items];
      if (index >= 0) {
        newBastek.splice(index, 1);
      } else {
        console.warn(
          `Can't remove dish (_id:${action.payload._id}) as its not in the cart`
        );
      }
      state.items = newBastek;
    },
    //Empty the cart
    emptyCart: (state, action) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQty, hydrate, emptyCart } =
  cartSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.cart.items;
export const selectTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.qty, 0);

export default cartSlice.reducer;
