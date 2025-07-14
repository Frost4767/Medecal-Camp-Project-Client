import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import ErrorPage from "../Pages/Error/ErrorElement";
import Register from "../Authentication/Register";
import Login from "../Authentication/Login";
import Home from "../Pages/Home/Home";
import PrivateRoute from "../Private/PrivateRoute";
import Dashboard from "../Layout/Dashbord";
import Profile from "../Components/Dashbord/Profile/Profile";
import Forbidden from "../Pages/Error/Forbidden";
import AddCamp from "../Components/Dashbord/Admin/AdminCompo/AddCamp";
import AvailableCamps from "../Components/Share/AllavaialeCamp";
import Container from "../Container/Container";
import CampDetails from "../Components/Share/Camp_Details";



const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                element: <Home></Home>,
            },
            {
                path: '/register',
                element: <Register></Register>,
            },
            {
                path: '/login',
                element: <Login></Login>,
            },
            {
                path: '/forbidden',
                element: <Forbidden></Forbidden>,
            },
            {
                path: '/camps',
                element: <Container><AvailableCamps></AvailableCamps></Container>,
            },
            {
                path: '/camp-details/:campId',
                element: <Container><CampDetails></CampDetails></Container>,
            },
            {
                path: '/about',
                element: <Login></Login>,
            },
        ],
    },
    {
    path: '/dashboard',
    element: (
      
        <Dashboard />
      
    ),
    children: [
      {
        index: true,
        element: (
          
            <Profile></Profile>
          
        ),
      },
      {
        path: 'analytic',
        element: <p>analytic</p>
      },
      {
        path: 'registercamp',
        element: <p>registerCamp</p>
      },
      {
        path: 'payment',
        element: <p>payments</p>
      },
      {
        path: 'addcamp',
        element: <AddCamp></AddCamp>
      },
      {
        path: 'managecamp',
        element: <p>manageCamp</p>
      },
      {
        path: 'manageresiter',
        element: <p>manageRegister</p>
      },
    ],
   },
    
])

export default router