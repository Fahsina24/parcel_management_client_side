import { useEffect, useState } from "react";
import { AuthContext } from "../../../../provider/AuthProvider";
import { useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ParcelBooking = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [userPhone, setUserPhone] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");

  useEffect(() => {
    if (weight) {
      const ratePerKg = 50;
      const w = parseFloat(weight);
      setPrice((w * ratePerKg).toFixed(2));
    } else {
      setPrice("");
    }
  }, [weight]);

  // New useEffect to fetch user phone number
  useEffect(() => {
    async function fetchUserPhone() {
      try {
        const res = await fetch(`http://localhost:3000/users/${user?.email}`);
        const data = await res.json();
        if (data) {
          data.map((singleData) => {
            if (singleData.buyerPhoneNo) {
              setUserPhone(singleData.buyerPhoneNo);
            } else {
              setUserPhone("");
            }
          });
        }
      } catch (error) {
        setUserPhone(" ");
        console.error("Failed to fetch user phone", error);
      }
    }
    if (user?.email) {
      fetchUserPhone();
    }
  }, []);

  const handleParcelBooking = async (e) => {
    e.preventDefault();

    const status = "pending";
    let bookingDate;
    const form = e.target;
    const parcelData = {
      buyerName: user?.displayName,
      buyerEmail: user?.email,
      buyerPhoneNo: form.userPhoneNo.value || userPhone,
      parcelType: form.parcelType.value,
      parcelWeight: form.weight.value,
      receiverName: form.receiverName.value,
      receiverPhoneNo: form.receiverPhone.value,
      deliveryAddress: form.deliveryAddress.value,
      deliveryDate: form.deliveryDate.value,
      latitude: form.lat.value,
      longitude: form.lon.value,
      price,
      status,
      bookingDate: new Date().toISOString().split("T")[0],
    };

    const parcelInfo = await axios.post(
      "http://localhost:3000/bookedParcels",
      parcelData
    );
    Swal.fire({
      title: "Hurrah..Congrats",
      text: "Parcel booking is done.",
      icon: "success",
    });
    navigate(`/dashboard/myParcels/${user.email}`);

    // console.log(" Parcel Booking Info:", parcelData);

    // TODO: Submit to backend or handle further
  };

  return (
    <div className="mx-auto bg-white p-6 rounded-lg shadow-2xl mb-20">
      <h2 className="text-4xl font-bold text-center mb-8 text-blue-500">
        Parcel Booking Form
      </h2>
      <form onSubmit={handleParcelBooking}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block font-semibold">Name:</label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="w-full p-2 border rounded mb-2"
            />
          </div>
          <div>
            <label className="block font-semibold">Email:</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full p-2 border rounded mb-2"
            />
          </div>
          <div>
            <label className="block font-semibold">Phone Number:</label>
            <input
              name="userPhoneNo"
              type="tel"
              pattern="[0-9]{11}"
              placeholder="Format:12345678901"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              readOnly={Boolean(userPhone)}
            />
          </div>

          <div>
            <label className="block font-semibold">Price:</label>
            <input
              type="number"
              name="price"
              value={price}
              readOnly
              className="w-full p-2 border rounded mb-4"
            />
          </div>
          <div>
            <label className="block font-semibold">Parcel Type:</label>
            <input
              name="parcelType"
              type="text"
              required
              className="w-full p-2 border rounded mb-2"
            />
          </div>
          <div>
            <label className="block font-semibold">Parcel Weight (kg):</label>
            <input
              name="weight"
              type="number"
              step="any"
              required
              min="0.01"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
          </div>
          <div>
            <label className="block font-semibold">Receiver’s Name:</label>
            <input
              name="receiverName"
              type="text"
              required
              className="w-full p-2 border rounded mb-2"
            />
          </div>
          <div>
            <label className="block font-semibold">
              Receiver's Phone Number:
            </label>
            <input
              name="receiverPhone"
              type="tel"
              pattern="[0-9]{11}"
              placeholder="Format: 12345678901"
              required
              className="w-full p-2 border rounded mb-2"
            />
          </div>

          <div>
            <label className="block font-semibold">
              Parcel Delivery Address:
            </label>
            <input
              name="deliveryAddress"
              type="text"
              required
              className="w-full p-2 border rounded mb-2"
            />
          </div>

          <div>
            <label className="block font-semibold">
              Requested Delivery Date:
            </label>
            <input
              name="deliveryDate"
              type="date"
              min={`${new Date().toISOString().split("T")[0]}`}
              required
              className="w-full p-2 border rounded mb-2"
            />
          </div>

          <div>
            <label className="block font-semibold">
              Delivery Address Latitude:
            </label>
            <input
              type="number"
              name="lat"
              step="any"
              className="w-full p-2 border rounded mb-2"
            />
          </div>

          <div>
            <label className="block font-semibold">
              Delivery Address Longitude:
            </label>
            <input
              type="number"
              name="lon"
              step="any"
              className="w-full p-2 border rounded mb-2"
            />
          </div>
        </div>
        <div className="min-w-full">
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-4 rounded hover:bg-green-600 font-bold"
          >
            Book Parcel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ParcelBooking;
