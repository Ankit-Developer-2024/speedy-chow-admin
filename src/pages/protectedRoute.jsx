import { useSelector } from "react-redux"
import { success, userLogedIn } from "../features/auth/authSlice"
import { Navigate } from "react-router"
import { Loader } from "../app/components/loader"

export const ProtectedRoute = ({ children }) => {
   let isuserLogedIn = useSelector(userLogedIn)
   let isSuccess = useSelector(success)
 
   if (!isSuccess) {
      return <div className="h-svh w-full flex flex-row items-center justify-center"><Loader></Loader></div>; // or a spinner
   }

   if (isuserLogedIn === false) {
      return <Navigate to='/login' replace={true}></Navigate>
   } else {
      return children
   }

}