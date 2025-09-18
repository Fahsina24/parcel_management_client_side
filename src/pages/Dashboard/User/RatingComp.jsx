import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useState } from "react";

const RatingComp = () => {
  const [rating, setRating] = useState(0);
  return (
    <div style={{ maxWidth: 180, width: "100%" }}>
      <Rating value={rating} onChange={setRating} />
      <button
        type="button"
        className="text-lg font-bold btn mt-2"
        onClick={() => setRating(0)}
      >
        Reset
      </button>
    </div>
  );
};

export default RatingComp;
