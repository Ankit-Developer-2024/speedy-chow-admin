import { configureStore } from '@reduxjs/toolkit'
import homeReducer from '../../features/home/homeSlice'
import userReducer from '../../features/user/userSlice'
export default configureStore({
  reducer: {
    home:homeReducer,
    user:userReducer
  },
})