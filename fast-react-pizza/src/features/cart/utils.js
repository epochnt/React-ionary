import { createSelector } from '@reduxjs/toolkit'
export const getCart = state => state.cart.cart

export const getTotalPrice = state => {
  return state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0)
}

export const getTotalItems = state => {
  return state.cart.cart.reduce((sum, item) => sum + item.qty, 0)
}

export const getQty = id => {
  return state =>
    state.cart.cart.find(item => item.pizzaId === id)?.qty ?? false
}

export const getTransformedCart = createSelector([getCart], cart =>
  cart.map(({ qty, ...pizza }) => ({ ...pizza, quantity: qty }))
)
