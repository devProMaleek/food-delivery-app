import { configureStore } from '@reduxjs/toolkit'

import cartReducer from './slices/CartSlice'
import restaurantReducer from './slices/RestaurantSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    restaurant: restaurantReducer,
  },
})