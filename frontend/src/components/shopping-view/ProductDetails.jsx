import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  addCartItem,
  fetchCart,
} from "../../store/shopSlice/cartSlice/index.js";
import { setProductDetails } from "../../store/shopSlice/productSlice/index.js";
import {
  addProductReview,
  fetchProductReviews,
} from "../../store/shopSlice/reviewSlice/index.js";
import StarRating from "../common/StarRating.jsx";

function ProductDetails({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  useEffect(() => {
    if (productDetails !== null) {
      dispatch(fetchProductReviews(productDetails?._id));
    }
  }, [productDetails, dispatch]);

  const handleRatingChange = (getRating) => {
    setRating(getRating);
  };

  const handleAddToCart = (productId, totalStock) => {
    const existingItem = cartItems?.items?.find(
      (item) => item.productId === productId
    );
    if (existingItem && existingItem.quantity + 1 > totalStock) {
      toast.error(`Only ${existingItem.quantity} quantity can be added.`);
      return;
    }
    dispatch(addCartItem({ userId: user?.id, productId, quantity: 1 })).then(
      (data) => {
        if (data?.payload?.success) {
          dispatch(fetchCart(user?.id));
          toast.success("Product added to cart!");
        }
      }
    );
  };

  const handleDialogClose = () => {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  };

  const handleAddReview = () => {
    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }
    dispatch(
      addProductReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(fetchProductReviews(productDetails?._id));
        toast.success("Review added successfully!");
      }
    });
  };

  const averageReview =
    reviews?.length > 0
      ? reviews.reduce((sum, item) => sum + item.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <dialog open={open} className="modal modal-open">
      <div className="modal-box w-full max-w-5xl bg-white shadow-xl rounded-lg">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">
            {productDetails?.title}
          </h1>
          <button
            onClick={handleDialogClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {/* Main Content */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div>
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />
          </div>
          {/* Product Details */}
          <div>
            <p className="text-gray-600 leading-relaxed">
              {productDetails?.description}
            </p>
            <div className="flex items-center mt-4">
              <StarRating rating={averageReview} />
              <span className="ml-2 text-gray-700">
                ({averageReview.toFixed(1)})
              </span>
            </div>
            <p className="text-2xl font-semibold mt-4 text-green-600">
              ${productDetails?.salePrice || productDetails?.price}
            </p>
            {productDetails?.totalStock > 0 ? (
              <button
                className="btn btn-primary w-full mt-6"
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
              >
                Add to Cart
              </button>
            ) : (
              <button className="btn btn-disabled w-full mt-6">
                Out of Stock
              </button>
            )}

            {/* Reviews Section */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-800">Reviews</h2>
              <div className="mt-4 max-h-60 overflow-y-auto space-y-4">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div
                      key={review._id}
                      className="flex items-start gap-4 p-4 border rounded-lg bg-gray-50"
                    >
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold text-gray-700">
                          {review.userName[0].toUpperCase()}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {review.userName}
                        </h3>
                        <StarRating rating={review.reviewValue} />
                        <p className="text-gray-600 mt-2">
                          {review.reviewMessage}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No reviews yet.</p>
                )}
              </div>
            </div>

            {/* Write Review */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-800">Write a review</h2>
              <div className="mt-4 flex items-center">
                <StarRating rating={rating} handleRatingChange={handleRatingChange} />
              </div>
              <input
                type="text"
                className="input input-bordered w-full mt-4 bg-white text-black"
                placeholder="Write a review..."
                value={reviewMsg}
                onChange={(e) => setReviewMsg(e.target.value)}
              />
              <button
                onClick={handleAddReview}
                disabled={!reviewMsg.trim() || rating === 0}
                className={`w-full mt-4 btn disabled:cursor-not-allowed ${
                  reviewMsg.trim() && rating > 0
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-white text-black"
                }`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="modal-action">
          <button
            onClick={handleDialogClose}
            className="btn btn-outline hover:bg-red-500 hover:border-red-500 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default ProductDetails;
