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
import ManageCamps from "../Components/Dashbord/Admin/AdminCompo/ManageCamp";
import RegisteredCamps from "../Components/Dashbord/Participent/RegisterCamp";
import PaymentHistory from "../Components/Dashbord/Participent/PaymentHistory";
import ManageRegisteredCamps from "../Components/Dashbord/Admin/ManageRegister";
import ParticipantAnalytics from "../Components/Dashbord/Participent/Analytics";
import PerticipantRoute from "../Private/PerticipentRoute";
import AdminRoute from "../Private/AdminRoute";
import AboutMedicalCamp from "../Components/Share/About";
import Contact from "@/Components/Share/Contact";
import Support from "@/Components/Share/Support";




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
                element: <Container><PrivateRoute><CampDetails></CampDetails></PrivateRoute></Container>,
            },
            {
                path: '/about',
                element: <AboutMedicalCamp></AboutMedicalCamp>,
            },
            {
                path: '/contact',
                element: <Contact></Contact>,
            },
            {
                path: '/support',
                element: <Support></Support>,
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
          
            <PrivateRoute><Profile></Profile></PrivateRoute>
          
        ),
      },
      {
        path: 'analytic',
        element: <PrivateRoute><PerticipantRoute><ParticipantAnalytics></ParticipantAnalytics></PerticipantRoute></PrivateRoute>
      },
      {
        path: 'registercamp',
        element: <PrivateRoute><PerticipantRoute><RegisteredCamps></RegisteredCamps></PerticipantRoute></PrivateRoute>
      },
      {
        path: 'payment',
        element: <PrivateRoute><PerticipantRoute><PaymentHistory></PaymentHistory></PerticipantRoute></PrivateRoute>
      },
      {
        path: 'addcamp',
        element: <PrivateRoute><AdminRoute><AddCamp></AddCamp></AdminRoute></PrivateRoute>
      },
      {
        path: 'managecamp',
        element: <PrivateRoute><AdminRoute><ManageCamps></ManageCamps></AdminRoute></PrivateRoute>
      },
      {
        path: 'manageresiter',
        element: <PrivateRoute><AdminRoute><ManageRegisteredCamps></ManageRegisteredCamps></AdminRoute></PrivateRoute>
      },
    ],
   },
    
])

export default router