import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { MdErrorOutline } from "react-icons/md";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const AllParcels = () => {
  const [deliveryMensData, setDeliveryMensData] = useState("");
  const [selectedDeliveryMen, setSelectedDeliveryMen] = useState(null);
  // const [deliveryMenId, setDeliveryMenId] = useState("");
  const [approximateDeliveryDate, setApproximateDeliveryDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [parcelId, setParcelId] = useState("");
  const {
    data: allParcels,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["allParcels"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/allParcels");
      return res.json();
    },
  });
  if (isPending) return "Loading...";

  // console.log(allParcels);
  const handleManage = async (id) => {
    setIsOpen(true);
    // console.log(id);
    const GetUsers = async () => {
      const res = await fetch(`http://localhost:3000/userType/deliveryMen`);
      const data = await res.json();
      setDeliveryMensData(data);
      setParcelId(id);
      setErrorMessage("");
    };
    GetUsers();
  };
  const handleAssign = async (date, id) => {
    setErrorMessage("");
    if (!selectedDeliveryMen) {
      setErrorMessage("Please select a delivery man");
      return;
    }

    if (!date) {
      setErrorMessage("Please select a date");
      return;
    } else {
      // console.log(date);
      try {
        const res = await fetch(
          `http://localhost:3000/user/${selectedDeliveryMen}`
        );
        const data = await res.json();
        let deliveryMenId = selectedDeliveryMen?._id;

        const updatedParcel = {
          status: "On The Way",
          deliveryMenId: `${deliveryMenId}`,
          approximateDeliveryDate: `${date}`,
        };
        // console.log(updatedParcel);
        await axios.patch(
          `http://localhost:3000/bookingDetailsUpdate/${id}`,
          updatedParcel
        );
        await refetch();
        Swal.fire({
          title: "Success",
          text: `${selectedDeliveryMen?.displayName} is chosen for this delivery`,
          icon: "success",
          confirmButtonText: "OK",
        });
        setApproximateDeliveryDate("");
        setSelectedDeliveryMen();
      } catch (error) {
        console.error(error);
      }
      setIsOpen(false);
    }
  };

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      {allParcels.length === 0 ? (
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
                <th>Phone No</th>
                <th>Booking Date</th>
                <th>Requested Delivery Date</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Manage</th>
              </tr>
            </thead>

            {allParcels?.map((parcel, index) => (
              <tbody key={index}>
                <tr>
                  <th>{index + 1}</th>
                  <td>{parcel.buyerEmail}</td>
                  <td>{parcel.buyerPhoneNo}</td>
                  <td>{parcel.bookingDate}</td>
                  <td>{parcel.deliveryDate}</td>
                  <td>{parcel.price}</td>
                  <td>{parcel.status}</td>
                  {(parcel.status === "pending" ||
                    parcel.status === "in-progress") && (
                    <td
                      className="btn m-4"
                      onClick={() => handleManage(parcel._id)}
                    >
                      Manage
                    </td>
                  )}
                  {parcel.status != "pending" &&
                    parcel.status != "in-progress" && (
                      <td className="btn m-4" disabled>
                        Manage
                      </td>
                    )}
                </tr>
              </tbody>
            ))}
          </table>
          {isOpen && (
            <div className="modal modal-open">
              <div className="modal-box">
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={() => setIsOpen(false)}
                >
                  ✕
                </button>

                <h3 className="font-bold text-2xl">Select a deliveryMen :</h3>

                {deliveryMensData && (
                  <select
                    className="text-lg border-gray-400 border-2 rounded-md"
                    value={selectedDeliveryMen?._id || ""}
                    onChange={(e) => {
                      const selectedMen = deliveryMensData.find(
                        (deliveryMen) => deliveryMen._id === e.target.value
                      );
                      setSelectedDeliveryMen(selectedMen || null);
                    }}
                  >
                    <option value="Default">Default</option>
                    {deliveryMensData.map((name, index) => (
                      <option key={index} value={name._id}>
                        {name.displayName}
                      </option>
                    ))}
                  </select>
                )}

                <div className="form-control flex flex-col">
                  <label className="label font-semibold text-gray-700">
                    Approximate Delivery Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setApproximateDeliveryDate(e.target.value)}
                    className="input input-bordered bg-gray-100 mt-2"
                  />
                  {errorMessage && (
                    <div className="mt-2 flex gap-2 items-center">
                      <MdErrorOutline color="red" />
                      <p className="text-red-700 text-sm">{errorMessage}</p>
                    </div>
                  )}

                  <button
                    className="btn mt-6"
                    onClick={() =>
                      handleAssign(approximateDeliveryDate, parcelId)
                    }
                  >
                    Assign
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllParcels;
