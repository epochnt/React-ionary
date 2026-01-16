import { combineReducers, createStore } from "redux";
import { deposit, withdraw, requestLoan, payLoan } from "./accountActions";
import { createCustomer, updateName } from "./customerActions";

const initialAccountState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialCustomerState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function accountReducer(state = initialAccountState, action) {
  switch (action.type) {
    // naming state-domain/event
    // state-domain: state is type of a account, event is deposit
    case "account/deposit":
      return {
        ...state,
        balance:
          action.payload > 0 ? state.balance + action.payload : state.balance,
      };

    case "account/withdraw":
      return {
        ...state,
        balance:
          action.payload > 0 && state.balance >= action.payload
            ? state.balance - action.payload
            : state.balance,
      };

    case "account/requestLoan":
      if (state.loan || action.payload.loan < 0) return state;
      return {
        ...state,
        loan: action.payload.loan,
        loanPurpose: action.payload.loanPurpose,
        balance: state.balance + action.payload.loan,
      };

    case "account/payLoan":
      if (state.balance < state.loan) return;
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

function customerReducer(state = initialCustomerState, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        ...action.payload,
      };

    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);
const unSubscribe = store.subscribe((e) => {
  console.log(store.getState());
});

console.log(store.getState());

store.dispatch(createCustomer("Nitin", 141241));

store.dispatch(deposit(5000));

store.dispatch(withdraw(500));

store.dispatch(updateName("Nitin Thakur"));

store.dispatch(requestLoan({ loan: 3000, loanPurpose: "A car loan" }));

store.dispatch(payLoan());

unSubscribe();
