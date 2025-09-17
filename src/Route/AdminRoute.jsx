import { Navigate } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";

const AdminRoute = ({ children }) => {
  const [userRole, isLoading] = useUserRole();
  // console.log(userRole);
  if (isLoading) {
    return (
      <span className="loading loading-bars loading-lg mx-auto items-center justify-center flex mt-10 mb-10"></span>
    );
  }

  if (userRole == "Admin") {
    return children;
  }
  return (
    <div>
      <Navigate to="/log_in"></Navigate>
    </div>
  );
};

export default AdminRoute;
