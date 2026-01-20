import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: [
    {
      pizzaId: 12,
      name: 'Mediterranean',
      qty: 2,
      unitPrice: 16,
      totalPrice: 32,
    },
  ],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.push(action.payload)
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
    },
    clearCart(state) {
      state.cart = []
    },
  },
})

export const { addItem, deleteItem, incItemQty, decItemQty, clearCart } =
  cartSlice.actions
export default cartSlice.reducer
