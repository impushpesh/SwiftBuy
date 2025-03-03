import React from "react";
import { FaStar } from "react-icons/fa";

function StarRating({ rating, handleRatingChange }) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={`btn btn-circle transition-colors ${
            star <= rating
              ? "text-yellow-500 bg-black hover:bg-yellow-600"
              : "text-black bg-white hover:bg-primary hover:text-white"
          }`}
          onClick={handleRatingChange ? () => handleRatingChange(star) : null}
        >
          <FaStar
            className={`w-6 h-6 ${star <= rating ? "fill-yellow-500" : "fill-black"}`}
          />
        </button>
      ))}
    </div>
  );
}

export default StarRating;
