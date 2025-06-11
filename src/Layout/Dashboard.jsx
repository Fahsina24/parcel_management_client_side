import { PiUsersThreeFill } from "react-icons/pi";
import { Link, Outlet } from "react-router-dom";
import { FaUsersGear } from "react-icons/fa6";
import { FaBoxesStacked } from "react-icons/fa6";
import { FcStatistics } from "react-icons/fc";
import { FaPeopleCarryBox } from "react-icons/fa6";
import { BsBoxFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { LiaClipboardListSolid } from "react-icons/lia";
import { MdReviews } from "react-icons/md";
import { IoIosHome } from "react-icons/io";
import Navbar from "../pages/SharedSections/Navbar/Navbar";
import Footer from "../pages/SharedSections/Footer/Footer";

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto text-2xl">
      <Navbar></Navbar>
      {/* SideBar */}
      <div className="flex gap-2 space-y-8">
        <div className="min-h-screen w-[30%] bg-yellow-500 pt-40 space-y-6 pb-40">
          {/* admin sections */}
          <div>
            <Link
              to="admin/allUsers"
              className="flex justify-center items-center gap-2  font-semibold"
            >
              <PiUsersThreeFill /> All Users
            </Link>
          </div>
          <div>
            <Link
              to="admin/allDeliveryMen"
              className="flex justify-center items-center gap-2 font-semibold"
            >
              <FaUsersGear /> All Delivery Men
            </Link>
          </div>
          <div>
            <Link
              to="admin/allParcels"
              className="flex justify-center items-center gap-2 font-semibold"
            >
              <FaBoxesStacked /> All Parcels
            </Link>
          </div>
          <div>
            <Link
              to="admin/statistics"
              className="flex justify-center items-center gap-2 font-semibold"
            >
              <FcStatistics /> Statistics
            </Link>
          </div>
          {/* user sidebar */}
          <div>
            <Link
              to="parcelBooking"
              className="flex justify-center items-center gap-2 font-semibold"
            >
              <FaPeopleCarryBox />
              Book A Parcel
            </Link>
          </div>
          <div>
            <Link
              to="myParcels"
              className="flex justify-center items-center gap-2 font-semibold"
            >
              <BsBoxFill /> My Parcels
            </Link>
          </div>
          <div>
            <Link
              to="myProfile"
              className="flex justify-center items-center gap-2 font-semibold"
            >
              <CgProfile />
              My Profile
            </Link>
          </div>

          {/* Delivery Men info */}
          <div>
            <Link
              to="deliveryMen/deliveryLists"
              className="flex justify-center items-center gap-2 font-semibold"
            >
              <LiaClipboardListSolid />
              My Delivery Lists
            </Link>
          </div>
          <div>
            <Link
              to="deliveryMen/myReviews"
              className="flex justify-center items-center gap-2 font-semibold"
            >
              <MdReviews />
              My Reviews
            </Link>
          </div>
          <div className="divider"></div>
          <div>
            <Link
              to="/"
              className="flex justify-center items-center gap-2 font-semibold"
            >
              <IoIosHome /> Home
            </Link>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="w-[70%] pt-40">
          <Outlet></Outlet>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Dashboard;
