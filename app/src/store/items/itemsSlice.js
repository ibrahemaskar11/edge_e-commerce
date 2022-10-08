import { createSlice } from "@reduxjs/toolkit";
const items = createSlice({
  name: "items",
  initialState: {
    items: [],
    selectedItem: null,
    isLoading: true,
    menItems: [],
    womenItems:[],
    error: false
  },
  reducers: {
    setItems(state, action) {
      state.items = action.payload.items;
    },
    setMenItems(state,action){
      state.menItems = action.payload.menItems;
    },
    setWomenItems(state,action){
      state.womenItems = action.payload.womenItems;
    },
    setSelectedItem(state, action) {
      state.selectedItem = action.payload.selectedItem;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },
    setError(state, action) {
      state.error = action.payload.error;
    },
  },
});
export const itemsActions = items.actions;

export default items;
