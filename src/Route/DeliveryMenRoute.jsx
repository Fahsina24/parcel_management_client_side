import { Navigate } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";

const DeliveryMenRoute = ({ children }) => {
  const [userRole, isLoading] = useUserRole();

  if (isLoading) {
    return (
      <span className="loading loading-bars loading-lg mx-auto items-center justify-center flex mt-10 mb-10"></span>
    );
  }

  if (userRole == "DeliveryMen") {
    return children;
  }
  return (
    <div>
      <Navigate to="/log_in"></Navigate>
    </div>
  );
};

export default DeliveryMenRoute;
