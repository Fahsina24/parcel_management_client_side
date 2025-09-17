import { Link, Outlet } from "react-router-dom";

import { IoIosHome } from "react-icons/io";
import Navbar from "../pages/SharedSections/Navbar/Navbar";
import Footer from "../pages/SharedSections/Footer/Footer";
import { AuthContext } from "../provider/AuthProvider";
import { useContext } from "react";
import useUserRole from "../hooks/useUserRole";
import UserMenu from "../component/UserMenu";
import DeliveryMenMenu from "../component/deliveryMenMenu";
import AdminMenu from "../component/AdminMenu";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [userRole] = useUserRole();
  // console.log(userRole);

  return (
    <div className="max-w-7xl mx-auto text-2xl">
      <Navbar></Navbar>
      {/* SideBar */}
      <div className="flex gap-2 space-y-8">
        <div className="min-h-screen w-[30%] bg-yellow-500 pt-40 space-y-6 pb-40">
          {userRole === "Admin" && <AdminMenu></AdminMenu>}
          {userRole === "DeliveryMen" && <DeliveryMenMenu></DeliveryMenMenu>}
          {userRole === "User" && <UserMenu> </UserMenu>}

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
