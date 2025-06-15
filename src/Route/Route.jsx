import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import LogIn from "../pages/LogIn/LogIn";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Register from "../pages/Register/Register";
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
import PrivateRoute from "../Route/PrivateRoute";

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
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "admin/allUsers",
        element: (
          <PrivateRoute>
            <AllUsers></AllUsers>
          </PrivateRoute>
        ),
      },
      {
        path: "admin/allDeliveryMen",
        element: (
          <PrivateRoute>
            <AllDeliveryMen></AllDeliveryMen>
          </PrivateRoute>
        ),
      },
      {
        path: "admin/allParcels",
        element: (
          <PrivateRoute>
            <AllParcels></AllParcels>
          </PrivateRoute>
        ),
        loader: () => fetch(`http://localhost:3000/allParcels`),
      },
      {
        path: "admin/statistics",
        element: (
          <PrivateRoute>
            <Statistics></Statistics>
          </PrivateRoute>
        ),
      },
      {
        path: "parcelBooking",
        element: (
          <PrivateRoute>
            <ParcelBooking></ParcelBooking>
          </PrivateRoute>
        ),
      },
      {
        path: "myParcels",
        element: (
          <PrivateRoute>
            <MyParcels></MyParcels>
          </PrivateRoute>
        ),
      },
      {
        path: "myProfile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "deliveryMen/deliveryLists",
        element: (
          <PrivateRoute>
            <MyDeliveryList></MyDeliveryList>
          </PrivateRoute>
        ),
      },
      {
        path: "deliveryMen/myReviews",
        element: (
          <PrivateRoute>
            <MyReviews></MyReviews>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
