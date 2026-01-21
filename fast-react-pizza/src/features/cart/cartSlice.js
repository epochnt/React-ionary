import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload)
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter(item => item.pizzaId !== action.payload)
    },
    incItemQty(state, action) {
      const item = state.cart.find(item => item.pizzaId === action.payload)
      item.totalPrice = ++item.qty * item.unitPrice
    },
    decItemQty(state, action) {
      const item = state.cart.find(item => item.pizzaId === action.payload)
      item.totalPrice = --item.qty * item.unitPrice

      // both payload have ids
      if (!item.qty) cartSlice.caseReducers.deleteItem(state, action)
    },
    clearCart(state) {
      state.cart = []
    },
  },
})

export const { addItem, deleteItem, incItemQty, decItemQty, clearCart } =
  cartSlice.actions
export default cartSlice.reducer
