import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateParcels = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const parcelInfo = useLoaderData();
  console.log(parcelInfo);

  const [buyerPhoneNo, setBuyerPhoneNo] = useState(parcelInfo?.buyerPhoneNo);
  const [deliveryAddress, setDeliveryAddress] = useState(
    parcelInfo?.deliveryAddress
  );
  const [deliveryDate, setDeliveryDate] = useState(parcelInfo?.deliveryDate);
  const [latitude, setLatitude] = useState(parcelInfo?.latitude);
  const [longitude, setLongitude] = useState(parcelInfo?.longitude);
  const [parcelType, setParcelType] = useState(parcelInfo?.parcelType);
  const [parcelWeight, setParcelWeight] = useState(parcelInfo?.parcelWeight);
  const [price, setPrice] = useState(parcelInfo?.price);
  const [receiverName, setReceiverName] = useState(parcelInfo?.receiverName);
  const [receiverPhoneNo, setReceiverPhoneNo] = useState(
    parcelInfo?.receiverPhoneNo
  );

  const [status, setStatus] = useState(parcelInfo?.status);

  useEffect(() => {
    if (parcelWeight) {
      const ratePerKg = 50;
      const w = parseFloat(parcelWeight);
      setPrice((w * ratePerKg).toFixed(2));
    } else {
      setPrice("");
    }
  }, [parcelWeight]);

  const handleUpdateParcel = async (e) => {
    e.preventDefault();

    const updatedParcel = {
      buyerEmail: parcelInfo?.buyerEmail,
      buyerName: parcelInfo?.buyerName,
      buyerPhoneNo,
      deliveryAddress,
      deliveryDate,
      latitude,
      longitude,
      parcelType,
      parcelWeight,
      receiverName,
      receiverPhoneNo,
    };

    try {
      await axios.patch(`http://localhost:3000/update/${id}`, updatedParcel);
      Swal.fire({
        title: "Success",
        text: "Parcel information updated successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-xl p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
          Update Parcel Details
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Update the parcel information below and click "Update Parcel".
        </p>

        <form
          onSubmit={handleUpdateParcel}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="form-control flex flex-col">
            <label className="label font-semibold text-gray-700">
              Buyer Name
            </label>

            <input
              type="text"
              value={parcelInfo?.buyerName}
              readOnly
              className="input input-bordered bg-gray-100 mt-2"
            />
          </div>

          <div className="form-control flex flex-col">
            <label className="label font-semibold text-gray-700">
              Buyer Email
            </label>

            <input
              type="email"
              value={parcelInfo?.buyerEmail}
              readOnly
              className="input input-bordered mt-2 bg-gray-100"
            />
          </div>

          {/* Editable Fields */}
          <div className="form-control flex flex-col">
            <label className="label font-semibold text-gray-700">
              Buyer Phone No
            </label>
            <input
              type="tel"
              pattern="[0-9]{11}"
              placeholder="e.g. 017XXXXXXXX"
              value={buyerPhoneNo}
              onChange={(e) => setBuyerPhoneNo(e.target.value)}
              className="input input-bordered mt-2"
            />
          </div>

          <div className="form-control flex flex-col">
            <label className="label font-semibold text-gray-700">
              Delivery Address
            </label>
            <input
              type="text"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="input input-bordered mt-2"
            />
          </div>

          <div className="form-control flex flex-col">
            <label className="label font-semibold text-gray-700">
              Delivery Date
            </label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="input input-bordered mt-2"
            />
          </div>

          <div className="form-control flex flex-col">
            <label className="label font-semibold text-gray-700">
              Latitude
            </label>
            <input
              type="number"
              step="any"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="input input-bordered mt-2"
            />
          </div>

          <div className="form-control flex flex-col">
            <label className="label font-semibold text-gray-700 mt-2">
              Longitude
            </label>
            <input
              type="number"
              step="any"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="input input-bordered mt-2"
            />
          </div>

          <div className="form-control flex flex-col">
            <label className="label font-semibold text-gray-700">
              Parcel Type
            </label>
            <input
              type="text"
              value={parcelType}
              onChange={(e) => setParcelType(e.target.value)}
              className="input input-bordered mt-2"
            />
          </div>

          <div className="form-control flex flex-col">
            <label className="label font-semibold text-gray-700">
              Parcel Weight (kg)
            </label>
            <input
              type="number"
              step="any"
              value={parcelWeight}
              onChange={(e) => setParcelWeight(e.target.value)}
              className="input input-bordered mt-2"
            />
          </div>

          <div className="form-control flex flex-col">
            <label className="label font-semibold text-gray-700">
              Price ($)
            </label>
            <input
              type="number"
              step="any"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="input input-bordered bg-gray-100 mt-2"
              readOnly
            />
          </div>

          <div className="form-control flex flex-col">
            <label className="label font-semibold text-gray-700">
              Receiver Name
            </label>
            <input
              type="text"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              className="input input-bordered mt-2"
            />
          </div>

          <div className="form-control flex flex-col">
            <label className="label font-semibold text-gray-700">
              Receiver Phone No
            </label>
            <input
              type="tel"
              pattern="[0-9]{11}"
              value={receiverPhoneNo}
              onChange={(e) => setReceiverPhoneNo(e.target.value)}
              className="input input-bordered mt-2"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-bold text-white bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 transition"
            >
              Update Parcel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateParcels;
