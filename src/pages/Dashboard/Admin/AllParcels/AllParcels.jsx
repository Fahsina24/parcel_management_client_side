import { useLoaderData } from "react-router-dom";

const AllParcels = () => {
  const allParcels = useLoaderData();
  // console.log(allParcels);
  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Phone No</th>
            <th>Booking Date</th>
            <th>Delivery Date</th>
            <th>Cost</th>
            <th>Status</th>
            <th>Manage</th>
          </tr>
        </thead>

        {allParcels.map((parcel, index) => (
          <tbody key={index}>
            <tr>
              <th>{index + 1}</th>
              <td>{parcel.buyerEmail}</td>
              <td>{parcel.buyerPhoneNo}</td>
              <td>{parcel.bookingDate}</td>
              <td>{parcel.deliveryDate}</td>
              <td>{parcel.price}</td>
              <td>{parcel.status}</td>
              <td className="btn m-4">Manage</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default AllParcels;
