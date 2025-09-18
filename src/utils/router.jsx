import { CreateProductPage } from '../pages/createProductPage';
import { CreateUserPage } from '../pages/createUserPage';
import { EditProductPage } from '../pages/editProductPage';
import HomePage from '../pages/homePage'
import UserPage from '../pages/userPage'
import { createBrowserRouter } from "react-router";

const Router =  createBrowserRouter([
    {
    path: "/",
    element: <HomePage></HomePage>,
    },
    {
    path: "/create-product",
    element: <CreateProductPage></CreateProductPage>,
    },
    {
    path: "/edit-product",
    element: <EditProductPage></EditProductPage>,
    },
    {
    path: "/user",
    element: <UserPage></UserPage>,
    },
    {
    path: "/user/create-user",
    element: <CreateUserPage></CreateUserPage>,
    },
  ])

export default Router