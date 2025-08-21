import { useQuery } from "@tanstack/react-query";

const MyDeliveryList = () => {
  const {
    data: allDeliveryMens,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["allDeliveryMenDetails"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3000/userType/deliveryMen/${_id}`
      );
      return res.json();
    },
  });

  if (isPending) return "Loading...";
  return <div>Delivery List</div>;
};

export default MyDeliveryList;
