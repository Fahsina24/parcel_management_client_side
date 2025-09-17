import { FaPeopleCarryBox } from "react-icons/fa6";
import { BsBoxFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const UserMenu = () => {
  const { user } = useContext(AuthContext);
  // console.log(user?.email);
  return (
    <div>
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
          to={`myParcels/${user?.email}`}
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
    </div>
  );
};

export default UserMenu;
