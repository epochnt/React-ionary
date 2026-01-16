// why not also wrap the store.dispatch call ?
// Also action string 
export function deposit(payload) {
  return { type: "account/deposit", payload}
}
export function withdraw(payload) {
  return { type: "account/withdraw", payload}
}
export function requestLoan(payload) {
  return { type: "account/requestLoan", payload}
}
export function payLoan() {
  return { type: "account/payLoan"}
}