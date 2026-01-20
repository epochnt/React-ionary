import { configureStore } from '@reduxjs/toolkit'
import { userReducer, cartReducer } from '../features'

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
})

export default store
