import React, { useContext, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../../provider/AuthProvider";

const MyParcels = () => {
  const { user } = useContext(AuthContext);
  const myParcels = useLoaderData();
  // console.log(myParcels);
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
          {myParcels.map((parcel, index) => (
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
                <button className="btn">Cancel</button>
              </td>
              <td>
                <button className="btn ">Review</button>
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
