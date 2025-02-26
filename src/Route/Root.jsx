import { createBrowserRouter } from "react-router";
import Main from "../Laout/Main/Main";
import Home from "../pages/Home/Home/Home";
import SignUp from "../Signup/SignUp";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            }
        ]
    }
])