import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import LogIn from "../pages/LogIn/LogIn";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Register from "../pages/Register/Register";
import DashboardLayout from "../Layout/Dashboard";
import ParcelBooking from "../pages/Dashboard/User/ParcelBooking/ParcelBooking";
import MyParcels from "../pages/Dashboard/User/MyParcels/MyParcels";
import MyProfile from "../pages/Dashboard/User/MyProfile/MyProfile";
import MyDeliveryList from "../pages/Dashboard/DeliveryMen/MyDeliveryList/MyDeliveryList";
import MyReviews from "../pages/Dashboard/DeliveryMen/MyReviews/MyReviews";
import AllUsers from "../pages/Dashboard/Admin/AllUsers/AllUsers";
import AllDeliveryMen from "../pages/Dashboard/Admin/AllDeliveryMen/AllDeliveryMen";
import AllParcels from "../pages/Dashboard/Admin/AllParcels/AllParcels";
import Statistics from "../pages/Dashboard/Admin/Statistics/Statistics";
import Dashboard from "../Layout/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/log_in",
    element: <LogIn />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "admin/allUsers",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "admin/allDeliveryMen",
        element: <AllDeliveryMen></AllDeliveryMen>,
      },
      {
        path: "admin/allParcels",
        element: <AllParcels></AllParcels>,
      },
      {
        path: "admin/statistics",
        element: <Statistics></Statistics>,
      },
      {
        path: "parcelBooking",
        element: <ParcelBooking></ParcelBooking>,
      },
      {
        path: "myParcels",
        element: <MyParcels></MyParcels>,
      },
      {
        path: "myProfile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "deliveryMen/deliveryLists",
        element: <MyDeliveryList></MyDeliveryList>,
      },
      {
        path: "deliveryMen/myReviews",
        element: <MyReviews></MyReviews>,
      },
    ],
  },
]);
