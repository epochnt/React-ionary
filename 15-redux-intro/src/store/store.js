import { createStore } from "redux";
import { deposit, withdraw, requestLoan, payLoan } from "./actions";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

function reducer(state = initialState, action) {
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

const store = createStore(reducer);
const unSubscribe = store.subscribe((e) => {
  console.log(store.getState());
});

console.log(store.getState());

store.dispatch(deposit(5000));

store.dispatch(withdraw(500));

store.dispatch(requestLoan({ loan: 3000, loanPurpose: "A car loan" }));

store.dispatch(payLoan());

unSubscribe();
