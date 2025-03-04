import { createBrowserRouter } from "react-router";
import Main from "../Laout/Main/Main";
import Home from "../pages/Home/Home/Home";
import SignUp from "../Signup/SignUp";
import Login from "../login/Login";
import CreateAssignment from "../pages/Assignments/CreateAssignment/CreateAssignment";
import Assignments from "../pages/Assignments/Assignments";
import UpdateAssignment from "../pages/Assignments/UpdateAssignment";
import AssignmentDetails from "../pages/Assignments/ViewAssignment/AssignmentDetails";
import ProtectRoute from "./ProtectRoute/ProtectRoute";
import AssignmentSubmissionForm from "../pages/Assignments/AssignmentSubmissionForm/AssignmentSubmissionForm";


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
            },
            {
                path: `/updateAssignment/:id`,
                element: <UpdateAssignment></UpdateAssignment>,
                loader: ({ params }) => fetch(`http://localhost:3000/assignment/${params.id}`)
            },
            {
                path: '/assignmentDetails/:id',
                element: <ProtectRoute><AssignmentDetails></AssignmentDetails></ProtectRoute>,
                loader: ({params}) => fetch(`http://localhost:3000/assignment/${params.id}`)
            },
            {
                path: '/assignmentSubmission',
                element: <AssignmentSubmissionForm></AssignmentSubmissionForm>
            }

        ]
    }
])