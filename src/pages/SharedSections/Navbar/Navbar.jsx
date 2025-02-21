import { AiOutlineMenuFold } from "react-icons/ai";
import { MdOutlineCircleNotifications } from "react-icons/md";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/navbarLogo.png";

const Navbar = () => {
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
      <div className="navbar-end gap-2">
        <a className="">
          <MdOutlineCircleNotifications size={30} />
        </a>
        <NavLink to="/log_in" className="btn">
          LogIn
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
