import { FaUsersGear } from "react-icons/fa6";
import { FaBoxesStacked } from "react-icons/fa6";
import { FcStatistics } from "react-icons/fc";
import { PiUsersThreeFill } from "react-icons/pi";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  const user = useAuth();
  return (
    <div>
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
    </div>
  );
};

export default AdminMenu;
