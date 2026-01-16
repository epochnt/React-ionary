import { createStore, combineReducers } from "redux";
import { accountReducer, customerReducer } from "../features";

const rootReducer = combineReducers({
  customer: customerReducer,
  account: accountReducer,
});

const store = new createStore(rootReducer);

export default store;
