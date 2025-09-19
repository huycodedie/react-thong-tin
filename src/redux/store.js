import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './slides/counterSlide'
import userReducer from './slides/userSlide'

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    user: userReducer
  },
})