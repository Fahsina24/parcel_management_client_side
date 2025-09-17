import { LiaClipboardListSolid } from "react-icons/lia";
import { MdReviews } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const DeliveryMenMenu = () => {
  const user = useAuth();
  return (
    <div>
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
    </div>
  );
};

export default DeliveryMenMenu;
