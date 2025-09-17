import { CreateProductPage } from '../pages/createProductPage';
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
    path: "/user",
    element: <UserPage></UserPage>,
    },
  ])

export default Router