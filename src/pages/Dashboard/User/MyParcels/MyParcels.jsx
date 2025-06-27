import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../../provider/AuthProvider";
import Swal from "sweetalert2";

const MyParcels = () => {
  const { user } = useContext(AuthContext);
  const myParcels = useLoaderData();
  const [listedData, setListedData] = useState(myParcels);
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
        fetch(`http://localhost:3000/cancel/${id}`, {
          method: "PATCH",
        })
          .then((res) => res.json())
          .then((data) => {
            const newListedData = listedData.map((data) =>
              id === data._id ? { ...data, status: "cancelled" } : data
            );
            setListedData(newListedData);
            Swal.fire({
              title: "Cancelled!",
              text: "Your parcel booking status has been updated.",
              icon: "success",
            });
          });
      }
    });
    // console.log(myParcels);
  };
  return (
    <div className="overflow-x-auto rounded-lg bg-base-100 border-gray-50 border-2">
      <table className="table ">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Parcel Type</th>
            <th>Requested Delivery Date</th>
            <th>Approximate Delivery Date</th>
            <th>Booking Date </th>
            <th>Delivery Men ID </th>
            <th>Booking Status</th>
            <th>Update</th>
            <th>Cancel</th>
            <th>Review</th>
            <th>Pay</th>
          </tr>
        </thead>
        <tbody>
          {listedData.map((parcel, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{parcel.parcelType}</td>
              <td>{parcel.deliveryDate}</td>
              <td>Approximate Delivery Date</td>
              <td>{parcel.bookingDate}</td>
              <td>DeliveryMenId</td>
              <td>{parcel.status}</td>
              <td>
                {parcel.status == "pending" ? (
                  <Link to={`/update/${parcel._id}`} className="btn ">
                    Update
                  </Link>
                ) : (
                  <button className="btn disabled bg-gray-200">Update</button>
                )}
              </td>
              <td>
                {parcel.status == "pending" ? (
                  <button
                    className="btn"
                    onClick={() => handleCancel(parcel._id)}
                  >
                    Cancel
                  </button>
                ) : (
                  <button className="btn disabled bg-gray-200">Cancel</button>
                )}
              </td>
              <td>
                {parcel.status == "delivered" && (
                  <button className="btn ">Review</button>
                )}
              </td>
              <td>
                <button className="btn ">Pay</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcels;
