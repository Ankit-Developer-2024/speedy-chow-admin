import { CreateProductPage } from '../pages/createProductPage';
import { CreateUserPage } from '../pages/createUserPage';
import { EditProductPage } from '../pages/editProductPage'; 
import { HomePage } from '../pages/homePage'; 
import { UserPage } from '../pages/userPage'; 
import { OrderPage } from '../pages/orderPage'; 
import { createBrowserRouter } from "react-router";
import { SignUpPage } from '../pages/signpPage';
import { LogInPage } from '../pages/logInPage';
import { ProtectedRoute } from '../pages/protectedRoute';

const Router =  createBrowserRouter([
    {
    path: "/signup",
    element: <SignUpPage></SignUpPage>,
    },
    {
    path: "/login",
    element: <LogInPage></LogInPage>,
    },
    {
    path: "/",
    element: <ProtectedRoute><HomePage></HomePage></ProtectedRoute>,
    },
    {
    path: "/create-product",
    element: <ProtectedRoute><CreateProductPage></CreateProductPage></ProtectedRoute>,
    },
    {
    path: "/edit-product",
    element: <ProtectedRoute><EditProductPage></EditProductPage></ProtectedRoute>,
    },
    {
    path: "/user",
    element: <ProtectedRoute><UserPage></UserPage></ProtectedRoute>,
    },
    {
    path: "/user/create-user",
    element: <ProtectedRoute><CreateUserPage></CreateUserPage></ProtectedRoute>,
    },
    {
    path: "/order",
    element: <ProtectedRoute><OrderPage></OrderPage></ProtectedRoute>,
    },
  ])

export default Router