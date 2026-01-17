import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      if (action.payload < 0) return;
      state.balance += action.payload;
    },

    withdraw(state, action) {
      if (action.payload < 0 || state.balance < action.payload) return;
      state.balance -= action.payload;
      state.isLoading = false;
    },

    requestLoan: {
      prepare(loanAmount, loanPurpose) {
        return { payload: { loanAmount, loanPurpose } };
      },

      reducer(state, action) {
        if (state.loan || action.payload.loanAmount < 0) return state;
        state.balance += action.payload.loanAmount;
        state.loan = action.payload.loanAmount;
        state.loanPurpose = action.payload.loanPurpose;
      },
    },

    payLoan(state) {
      if (state.balance < state.loan) return;
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },

    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };
  return async (dipatch) => {
    try {
      dipatch({ type: "acccount/convertingCurrency" });
      const res = await fetch(
        `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=${"USD"}`
      );
      const data = await res.json();
      const amountUSD = amount * data.rates["USD"];
      dipatch({ type: "account/deposit", payload: amountUSD });
    } catch (error) {
      console.log(error);
    }
  };
}

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;
export default accountSlice.reducer;
