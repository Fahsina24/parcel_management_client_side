import { useQuery } from "@tanstack/react-query";

const AllDeliveryMen = () => {
  const {
    data: allDeliveryMen,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["allDeliveryMenDetails"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/userType/deliveryMen");
      return res.json();
    },
  });
  console.log(allDeliveryMen);
  if (isPending) return "Loading...";
  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      {allDeliveryMen.length === 0 ? (
        <div>
          <p>Nothing to show</p>
        </div>
      ) : (
        <div>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Delivery Man's Name</th>
                <th>Phone Number</th>
                <th>Number of parcels delivered</th>
                <th>Average review</th>
              </tr>
            </thead>

            {allDeliveryMen?.map((man, index) => (
              <tbody key={index}>
                <tr>
                  <th>{index + 1}</th>
                  <td>{man.displayName}</td>
                  <td>{man?.buyerPhoneNo}</td>
                  <td>number of parcel delivered</td>
                  <td>Average Review</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default AllDeliveryMen;
