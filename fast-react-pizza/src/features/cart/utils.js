export const getTotalPrice = state => {
  return state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0)
}

export const getTotalItems = state => {
  return state.cart.cart.reduce((sum, item) => sum + item.qty, 0)
}
