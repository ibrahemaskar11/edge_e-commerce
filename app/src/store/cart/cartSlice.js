import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
const cart = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalAmount: 0,
    totalItems: 0,
    isLoading: false,
    error: false,
    changed: false,
    intialized: false,
  },
  reducers: {
    setCartData(state, action) {
      const { items, totalAmount, totalItems } = action.payload.cart;
      state.cartItems = items;
      state.totalAmount = totalAmount;
      state.totalItems = totalItems;
      state.changed = true;
    },
    setChanged(state, action) {
      state.changed = action.payload.changed;
    },
    setInitialized(state, action) {
      state.intialized = action.payload.setInitialized;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },
    setError(state, action) {},
    addToCart(state, action) {
      const updatedTotalAmount = state.totalAmount + action.payload.item.price;
      const existingCartItemIndex = state.cartItems.findIndex(
        (item) => item.cartId === action.payload.item.cartId
      );
      const existingCartItem = state.cartItems[existingCartItemIndex];
      let updatedItems;
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + 1,
        };
        updatedItems = [...state.cartItems];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const item = {
          ...action.payload.item,
        };
        updatedItems = [action.payload.item, ...state.cartItems];
      }
      state.cartItems = updatedItems;
      state.totalAmount = updatedTotalAmount;
      state.totalItems = state.totalItems + 1;
      state.changed = true;
    },
    removeFromCart(state, action) {
      const existingCartItemIndex = state.cartItems.findIndex(
        (item) => item.cartId === action.payload.item.cartId
      );
      const exisitingCartItem = state.cartItems[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - exisitingCartItem.price;
      let updatedItems;
      if (exisitingCartItem.amount === 1) {
        updatedItems = state.cartItems.filter(
          (item) => item.cartId !== action.payload.item.cartId
        );
      } else {
        const updatedItem = {
          ...exisitingCartItem,
          amount: exisitingCartItem.amount - 1,
        };
        updatedItems = [...state.cartItems];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      state.cartItems = updatedItems;
      state.totalAmount = updatedTotalAmount;
      state.totalItems = state.totalItems - 1;
      state.changed = true;
    },
    removeItem(state, action) {
      const existingCartItemIndex = state.cartItems.findIndex(
        (item) => item.cartId === action.payload.item.cartId
      );
      const exisitingCartItem = state.cartItems[existingCartItemIndex];
      const amountRemoved = exisitingCartItem.amount;
      const updatedTotalAmount =
        state.totalAmount - exisitingCartItem.price * exisitingCartItem.amount;
      const updatedItem = state.cartItems.filter(
        (item) => item.cartId !== action.payload.item.cartId
      );
      state.cartItems = updatedItem;
      state.totalAmount = updatedTotalAmount;
      state.totalItems = state.totalItems - amountRemoved;
      state.changed = true;
    },
    emptyCart(state, action) {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalItems = 0;
      state.changed = true;
    },
  },
});
export const cartActions = cart.actions;

export default cart;
