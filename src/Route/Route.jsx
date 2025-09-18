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
import UpdateParcels from "../pages/Dashboard/User/UpdateParcels/UpdateParcels";
import AdminRoute from "./AdminRoute";
import DeliveryMenRoute from "./DeliveryMenRoute";
import UserRoute from "./UserRoute";

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
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "admin/allUsers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "admin/allDeliveryMen",
        element: (
          <AdminRoute>
            <AllDeliveryMen></AllDeliveryMen>
          </AdminRoute>
        ),
      },
      {
        path: "admin/allParcels",
        element: (
          <AdminRoute>
            <AllParcels></AllParcels>
          </AdminRoute>
        ),
      },
      {
        path: "admin/statistics",
        element: (
          <AdminRoute>
            <Statistics></Statistics>
          </AdminRoute>
        ),
      },
      {
        path: "parcelBooking",
        element: (
          <UserRoute>
            <ParcelBooking></ParcelBooking>
          </UserRoute>
        ),
      },
      {
        path: "myParcels/:email",
        element: (
          <UserRoute>
            <MyParcels></MyParcels>
          </UserRoute>
        ),
      },
      {
        path: "myProfile",
        element: (
          <UserRoute>
            <MyProfile></MyProfile>
          </UserRoute>
        ),
      },
      {
        path: "deliveryMen/deliveryLists",
        element: (
          <DeliveryMenRoute>
            <MyDeliveryList></MyDeliveryList>
          </DeliveryMenRoute>
        ),
      },
      {
        path: "deliveryMen/myReviews",
        element: (
          <DeliveryMenRoute>
            <MyReviews></MyReviews>
          </DeliveryMenRoute>
        ),
      },
    ],
  },
  {
    path: "/update/:id",
    element: (
      <PrivateRoute>
        <UserRoute>
          <UpdateParcels></UpdateParcels>
        </UserRoute>
      </PrivateRoute>
    ),
  },
]);
