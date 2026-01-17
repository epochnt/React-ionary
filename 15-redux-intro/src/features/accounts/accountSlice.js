const initialAccountState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

/* ---------- Account Reducer ---------- */
export default function accountReducer(state = initialAccountState, action) {
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
      if (state.loan || action.payload.loanAmount < 0) return state;
      return {
        ...state,
        loan: action.payload.loanAmount,
        loanPurpose: action.payload.loanPurpose,
        balance: state.balance + action.payload.loanAmount,
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

/* ---------- Actions ---------- */
export function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
export function requestLoan(loanAmount, loanPurpose) {
  return { type: "account/requestLoan", payload: { loanAmount, loanPurpose } };
}
export function payLoan() {
  return { type: "account/payLoan" };
}
