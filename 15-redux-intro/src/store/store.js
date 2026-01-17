import { configureStore } from "@reduxjs/toolkit";
import { accountReducer, customerReducer } from "../features";

const store = new configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
