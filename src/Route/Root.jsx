import { createBrowserRouter } from "react-router";
import Main from "../Laout/Main/Main";
import Home from "../pages/Home/Home/Home";
import SignUp from "../Signup/SignUp";
import Login from "../login/Login";
import CreateAssignment from "../pages/Assignments/CreateAssignment/CreateAssignment";
import Assignments from "../pages/Assignments/Assignments";


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
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/createAssignment',
                element: <CreateAssignment></CreateAssignment>
            },
            {
                path: '/assignment',
                element: <Assignments></Assignments>
            }
        ]
    }
])