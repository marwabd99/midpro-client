import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import usersReducer from "./slices/usersSlice"; 

const store = configureStore({
  reducer: {
    products: productsReducer,
    users: usersReducer, 
  },
});

export default store;
