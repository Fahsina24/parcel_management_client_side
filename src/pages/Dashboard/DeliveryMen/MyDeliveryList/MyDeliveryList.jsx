import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";

const MyDeliveryList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: DeliveryMenDetails,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["DeliveryMenDetails"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userType/deliveryMen/${user?.email}`);
      return res.data;
    },
  });
  // console.log(DeliveryMenDetails);

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/cancel/${id}`);
        Swal.fire({
          title: "Cancelled!",
          text: "Your parcel booking status has been updated.",
          icon: "success",
        });
      }
    });
  };

  const handleDeliver = (id) => {
    axiosSecure.patch(`/deliver/${id}`);
    Swal.fire({
      title: "Delivered!",
      text: "Parcel Delivered Successful.",
      icon: "success",
    });
  };

  if (isPending) return "Loading...";
  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      {DeliveryMenDetails?.length === 0 ? (
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
                <th>Booked User Name</th>
                <th>Receiver's Name</th>
                <th>Booked User’s Phone</th>
                <th>Requested Delivery Date</th>
                <th>Approximate Delivery Date</th>
                <th>Receiver's Phone Number</th>
                <th>Receivers Address</th>
                <th>View Location </th>
                <th>Cancel Button </th>
                <th>Deliver Button </th>
              </tr>
            </thead>
            <tbody>
              {DeliveryMenDetails?.map((parcelInfo, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{parcelInfo?.buyerName}</td>
                  <td>{parcelInfo?.receiverName}</td>
                  <td>{parcelInfo?.buyerPhoneNo}</td>
                  <td>{parcelInfo?.deliveryDate}</td>
                  <td>{parcelInfo?.approximateDeliveryDate}</td>
                  <td>{parcelInfo?.receiverPhoneNo}</td>
                  <td>{parcelInfo?.deliveryAddress}</td>
                  <td>Location</td>
                  <td>
                    {parcelInfo?.status !== "cancelled" ||
                    parcelInfo?.status !== "delivered" ? (
                      <button
                        className="btn"
                        onClick={() => handleCancel(parcelInfo._id)}
                      >
                        Cancel
                      </button>
                    ) : (
                      <button className="btn disabled bg-gray-200">
                        Cancel
                      </button>
                    )}
                  </td>
                  <td>
                    {parcelInfo?.status !== "delivered" ||
                    parcelInfo?.status !== "cancelled" ? (
                      <button
                        className="btn"
                        onClick={() => handleDeliver(parcelInfo._id)}
                      >
                        Deliver
                      </button>
                    ) : (
                      <button className="btn disabled bg-gray-200">
                        Deliver
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyDeliveryList;
