import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      {/* SideBar */}
      <div className="flex gap-2">
        <div className="min-h-screen w-50 bg-amber-400">
          {/* admin sections */}
          <div>
            <Link to="admin/allUsers" className="text-xl font-semibold">
              All Users
            </Link>
          </div>
          <div>
            <Link to="admin/allDeliveryMen" className="text-xl font-semibold">
              All Delivery Men
            </Link>
          </div>
          <div>
            <Link to="admin/allParcels" className="text-xl font-semibold">
              All Parcels
            </Link>
          </div>
          <div>
            <Link to="admin/statistics" className="text-xl font-semibold">
              Statistics
            </Link>
          </div>
          {/* user sidebar */}
          <div>
            <Link to="parcelBooking" className="text-xl font-semibold">
              Book A Parcel
            </Link>
          </div>
          <div>
            <Link to="myParcels" className="text-xl font-semibold">
              My Parcels
            </Link>
          </div>
          <div>
            <Link to="myProfile" className="text-xl font-semibold">
              My Profile
            </Link>
          </div>

          {/* Delivery Men info */}
          <div>
            <Link
              to="deliveryMen/deliveryLists"
              className="text-xl font-semibold"
            >
              My Delivery Lists
            </Link>
          </div>
          <div>
            <Link to="deliveryMen/myReviews" className="text-xl font-semibold">
              My Reviews
            </Link>
          </div>
        </div>

        {/* Dashboard Content */}
        <div>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
