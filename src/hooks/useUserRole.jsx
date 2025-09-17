import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: userRole = [], isLoading } = useQuery({
    queryKey: [user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/userRole/${user?.email}`);
      // console.log(res.data);
      return res.data;
    },
  });
  return [userRole, isLoading];
};

export default useUserRole;
