import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { signOutUser } = useAuth();
  // for authorization
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access_token");
      // console.log(token);
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // for error check 401 or 403 status
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      // console.log(status);
      if (status === 401 || status === 403) {
        await signOutUser();
        navigate("/register");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
