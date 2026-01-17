const initialCustomerState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

/* ---------- Customer Reducer ---------- */
export default function customerReducer(state = initialCustomerState, action) {
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

/* ---------- Actions ---------- */
export function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}
export function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}
