import { useQuery } from "@tanstack/react-query";

const AllUsers = () => {
  const {
    data: allUsers,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["allUsersDetails"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/allUsersDetails");
      return res.json();
    },
  });
  if (isPending) return "Loading...";

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      {allUsers.length === 0 ? (
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
                <th>Name</th>
                <th>Phone Number</th>
                <th>Number of parcels delivered</th>
                <th>Total Spending</th>
                <th>Make DeliveryMen Panel</th>
                <th>Make Admin Panel</th>
              </tr>
            </thead>

            {allUsers?.map((man, index) => (
              <tbody key={index}>
                <tr>
                  <th>{index + 1}</th>
                  <td>{man?.displayName}</td>
                  <td>{man?.buyerPhoneNo}</td>
                  <td>Booked Parcels Quantity</td>
                  <td>Total Spent</td>
                  <td>
                    <button className="btn m-4">Make DeliveryMen</button>
                  </td>
                  <td>
                    <button className="btn m-4">Make Admin</button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
