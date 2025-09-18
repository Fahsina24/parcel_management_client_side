import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAuth from "../../../../hooks/useAuth";
import RatingComp from "../RatingComp";

const MyParcels = () => {
  const { email } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [listedData, setListedData] = useState([]);
  let [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axiosSecure
      .get(`/myParcels/${email}`)
      .then((res) => setListedData(res.data))
      .catch((err) => console.error(err));
  }, [email, axiosSecure]);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

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
              <td>{parcel?.approximateDeliveryDate}</td>
              <td>{parcel.bookingDate}</td>
              <td>{parcel?.deliveryMenId}</td>
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
                  <button className="btn" onClick={() => setIsOpen(true)}>
                    Review
                  </button>
                )}
              </td>
              <td>
                <button className="btn ">Pay</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-blue-400 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <DialogTitle
                  as="h3"
                  className="text-base/7 font-bold text-black text-center "
                >
                  Review Form
                </DialogTitle>
                <form>
                  <div className="card-body">
                    <fieldset className="fieldset">
                      <label className="label text-xl text-black font-bold">
                        User's Name:
                      </label>
                      <input
                        type="text"
                        className="input text-lg text-black"
                        placeholder={user?.displayName}
                        readOnly
                      />
                      <label className="label text-xl text-black font-bold">
                        User's Photo:
                      </label>
                      <img
                        src={user?.photoURL}
                        className="w-15 h-15 rounded-xl"
                      />

                      <label className="label text-xl text-black font-bold">
                        Delivery Men's Id:
                      </label>
                      <input
                        type="text"
                        className="input text-lg text-black mb-2"
                        placeholder="fs"
                        readOnly
                      />
                      <label className="label text-xl text-black font-bold">
                        Give Ratings:
                      </label>
                      <RatingComp></RatingComp>
                      <label className="label text-xl text-black font-bold">
                        Feedback:
                      </label>
                      <textarea
                        placeholder="Write Your Feedback Please"
                        className="textarea textarea-neutral"
                      ></textarea>
                      <div className="mt-4">
                        <Button
                          className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                          onClick={close}
                        >
                          Submit
                        </Button>
                      </div>
                    </fieldset>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default MyParcels;
