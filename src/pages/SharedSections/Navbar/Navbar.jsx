import { AiOutlineMenuFold } from "react-icons/ai";
import { MdOutlineCircleNotifications } from "react-icons/md";
import { Link } from "react-router-dom";
import logo from "../../../assets/navbarPic/navbarLogo.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ButtonDesign from "../BtnDesign/ButtonDesign";
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const [userRole, isLoading] = useUserRole();
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        // console.log("User Sign out Successfully.");
        Swal.fire({
          title: "Success",
          text: "Sign Out Successful ",
          icon: "success",
          confirmButtonText: "Close",
        });
        navigate("/register");
      })
      .catch((error) => console.log("Error", error.message));
  };
  const NavOptions = (
    <div className="flex gap-4 flex-col lg:flex-row ">
      <Link to="/">
        <ButtonDesign value="Home"></ButtonDesign>
      </Link>
      {user && userRole === "Admin" && (
        <>
          <Link to="/dashboard/admin/statistics">
            <ButtonDesign value="DashBoard"></ButtonDesign>
          </Link>
        </>
      )}
      {user && userRole === "DeliveryMen" && (
        <>
          <Link to="/dashboard/deliveryMen/deliveryLists">
            <ButtonDesign value="DashBoard"></ButtonDesign>
          </Link>
        </>
      )}
      {user && userRole === "User" && (
        <>
          <Link to="/dashboard/parcelBooking">
            <ButtonDesign value="DashBoard"></ButtonDesign>
          </Link>
        </>
      )}
    </div>
  );

  const imageHoverOptions = (
    <div className=" bg-gradient-to-r from-blue-400 to-blue-300 ">
      <p
        className="pointer-events-none text-lg
        font-extrabold text-fuchsia-800 my-4"
      >
        {user?.displayName}
      </p>
      <Link
        to="/dashboard/parcelBooking"
        className=" btn bg-blue-400 border-0 font-extrabold text-lg min-w-full hover:bg-sky-600 focus:bg-sky-700 my-4 shadow-none"
      >
        DashBoard"
      </Link>

      <div
        className=" btn bg-blue-400 border-0 font-extrabold text-lg min-w-full hover:bg-sky-600 focus:bg-sky-700 my-4 shadow-none"
        onClick={handleSignOut}
      >
        Log Out
      </div>
    </div>
  );

  return (
    <div className="navbar max-w-7xl fixed font-extrabold z-[1] text-white ">
      <div className="navbar-start gap-2 ">
        <div className="dropdown">
          <div
            tabIndex={0}
            className=" border-gray-200 border-1 p-1 rounded hover:bg-gray-400 lg:hidden"
          >
            <AiOutlineMenuFold size={20} />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {NavOptions}
          </ul>
        </div>
        <img className="w-15 h-15 rounded-full mr-2" src={logo} />
        <ButtonDesign value="SwiftDrop"></ButtonDesign>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{NavOptions}</ul>
      </div>
      <div className="navbar-end flex gap-4 mr-2">
        <a>
          <MdOutlineCircleNotifications size={30} />
        </a>
        <button>
          {user ? (
            <div className="flex flex-row justify-center items-center relative gap-4">
              <div className="dropdown">
                <div tabIndex={0}>
                  <img
                    src={user?.photoURL}
                    alt="Profile Photo"
                    className="rounded-full object-cover w-12 h-12 border-2 border-gray-600"
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 right-2 w-50"
                >
                  {imageHoverOptions}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/log_in"
                className="btn bg-gradient-to-r from-blue-400 to-blue-600 w-20 md:w-32 md:h-16 text-sm text-white md:text-lg border-none shadow-none"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="btn bg-gradient-to-r from-pink-400 to-pink-300 border-none shadow-none w-20 md:w-32 md:h-16 text-sm md:text-lg"
              >
                Register
              </Link>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
