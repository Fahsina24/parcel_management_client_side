import { AiOutlineMenuFold } from "react-icons/ai";
import { MdOutlineCircleNotifications } from "react-icons/md";
import { Link } from "react-router-dom";
import logo from "../../../assets/navbarLogo.png";
import { AuthContext } from "../../../provider/AuthProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

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
    <>
      <li>
        <a>Home</a>
      </li>
      <li>
        <a>Item 1</a>
      </li>
      <li>
        <a>Item 1</a>
      </li>
    </>
  );

  const imageHoverOptions = (
    <div className=" bg-gradient-to-r from-blue-400 to-blue-300">
      <p
        className="pointer-events-none text-lg
        font-extrabold text-fuchsia-800"
      >
        {user?.displayName}
      </p>
      <Link
        to="dashboard"
        className="font-extrabold text-lg min-w-full text-left"
      >
        Dashboard
      </Link>

      <div
        className=" btn btn-accent min-w-full font-extrabold text-lg hover:bg-sky-600"
        onClick={handleSignOut}
      >
        Log Out
      </div>
    </div>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start ">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
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
        <img className="w-15 h-15" src={logo} />
        <a className="text-sm font-extrabold md:text-xl">SwiftDrop</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{NavOptions}</ul>
      </div>
      <div className="navbar-end flex gap-4">
        <a>
          <MdOutlineCircleNotifications size={30} />
        </a>
        <button>
          {user ? (
            <div className="flex flex-row justify-center items-center relative gap-4">
              <div className="dropdown">
                <div tabIndex={0} role="button">
                  <img
                    src={user?.photoURL}
                    alt="Profile Photo"
                    className="rounded-full object-cover w-2/3 h-2/3"
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
                className="btn bg-gradient-to-r from-blue-500 to-blue-700 w-20 md:w-32 md:h-16 text-sm text-white md:text-lg"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="btn btn-secondary w-20 md:w-32 md:h-16 text-sm md:text-lg"
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
