import { configureStore } from '@reduxjs/toolkit'
import homeReducer from '../../features/home/homeSlice'
import userReducer from '../../features/user/userSlice'
import orderReducer from '../../features/order/orderSlice'
import AuthReducer from '../../features/auth/authSlice'
import sideBarReducer from '../../features/sideBar/sideBarSlice'
export default configureStore({
  reducer: {
    home:homeReducer,
    user:userReducer,
    order:orderReducer,
    auth:AuthReducer,
    sideBar:sideBarReducer
  },
})