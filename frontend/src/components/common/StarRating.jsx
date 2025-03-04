import React from "react";
import { FaStar } from "react-icons/fa";

function StarRating({ rating, handleRatingChange }) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={handleRatingChange ? () => handleRatingChange(star) : null}
          className="transition transform hover:scale-125 duration-200 focus:outline-none"
        >
          <FaStar
            className={`w-6 h-6 ${
              star <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export default StarRating;
