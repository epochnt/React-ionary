import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { accountReducer, customerReducer } from "../features";

const rootReducer = combineReducers({
  customer: customerReducer,
  account: accountReducer,
});

const store = new createStore(rootReducer, applyMiddleware(thunk));

export default store;
