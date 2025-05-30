import { useState } from "react";
import { AuthContext } from "../../../../provider/AuthProvider";
import { useContext } from "react";

const ParcelBooking = () => {
  const { user } = useContext(AuthContext);
  const [weight, setWeight] = useState(1);
  const [price, setPrice] = useState(50);

  const calculatePrice = (value) => {
    let price = weight * value;
    setPrice(price);
  };
  console.log(price);
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Parcel Booking Form</h2>
      <form>
        <label className="block font-semibold">Name:</label>
        <input
          type="text"
          value={user.displayName}
          readOnly
          className="w-full p-2 border rounded mb-2"
        />

        <label className="block font-semibold">Email:</label>
        <input
          type="email"
          value={user.email}
          readOnly
          className="w-full p-2 border rounded mb-2 "
        />

        <label className="block font-semibold">Phone Number:</label>
        <input type="tel" required className="w-full p-2 border rounded mb-2" />

        <label className="block font-semibold">Parcel Type:</label>
        <input
          type="text"
          required
          className="w-full p-2 border rounded mb-2"
        />

        <label className="block font-semibold">Parcel Weight (kg):</label>
        <input
          type="number"
          min="1"
          required
          value={weight}
          onChange={(e) => {
            setWeight(e.target.value);
          }}
          className="w-full p-2 border rounded mb-2"
        />

        <label className="block font-semibold">Receiver’s Name:</label>
        <input
          type="text"
          required
          className="w-full p-2 border rounded mb-2"
        />

        <label className="block font-semibold">Receiver's Phone Number:</label>
        <input
          type="number"
          required
          className="w-full p-2 border rounded mb-2"
        />

        <label className="block font-semibold">Parcel Delivery Address:</label>
        <input
          type="text"
          required
          className="w-full p-2 border rounded mb-2"
        />

        <label className="block font-semibold">Requested Delivery Date:</label>
        <input
          type="date"
          required
          className="w-full p-2 border rounded mb-2"
        />

        <label className="block font-semibold">
          Delivery Address Latitude:
        </label>
        <input
          type="text"
          pattern="^-?\d{1,2}\.\d+$"
          required
          className="w-full p-2 border rounded mb-2"
        />

        <label className="block font-semibold">
          Delivery Address Longitude:
        </label>
        <input
          type="text"
          pattern="^-?\d{1,3}\.\d+$"
          required
          className="w-full p-2 border rounded mb-2"
        />

        <label className="block font-semibold">Price:</label>
        <input
          type="text"
          value={price}
          readOnly
          className="w-full p-2 border rounded mb-2"
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Book
        </button>
      </form>
    </div>
  );
};

export default ParcelBooking;
