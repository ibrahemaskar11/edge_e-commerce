import { configureStore } from "@reduxjs/toolkit";
import items from "./items/itemsSlice";
import cart from "./cart/cartSlice";
import wishList from "./wishList/wishListSlice";

const store = configureStore({
  reducer: {
    items: items.reducer,
    cart: cart.reducer,
    wishList: wishList.reducer,
  },
});

export default store;
