import { createSlice } from "@reduxjs/toolkit";
const wishList = createSlice({
  name: "wishList",
  initialState: {
    wishListItems: [],
    isLoading: true,
    error: false,
    wishListChanged: false,
  },
  reducers: {
    setWishListItems(state, action) {
      state.wishListItems = action.payload;
      state.wishListChanged = false
    },
    removeItemFromWishList(state, action) {
      const updatedItems = state.wishListItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.wishListItems = updatedItems;
      state.wishListChanged = true;
    },
    setChanged(state,action){
        state.wishListChanged = action.payload.changed
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },
    setError(state, action) {
      state.error = action.payload.error;
    },
  },
});
export const wishListActions = wishList.actions;

export default wishList;
