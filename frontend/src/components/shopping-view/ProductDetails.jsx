import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  addCartItem,
  fetchCart,
} from "../../store/shopSlice/cartSlice/index.js";
import {
  setProductDetails,
} from "../../store/shopSlice/productSlice/index.js";
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
  }, [productDetails]);

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
      <div className="modal-box w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">{productDetails?.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="w-full h-80 object-cover rounded-lg"
          />
          <div>
            <p className="text-gray-600">{productDetails?.description}</p>
            <div className="flex items-center mt-3">
              <StarRating rating={averageReview} />
              <span className="ml-2 text-gray-500">({averageReview.toFixed(1)})</span>
            </div>
            <p className="text-xl font-semibold mt-3">
              ${productDetails?.salePrice || productDetails?.price}
            </p>
            {productDetails?.totalStock > 0 ? (
              <button
                className="btn btn-primary w-full mt-4"
                onClick={() => handleAddToCart(productDetails?._id, productDetails?.totalStock)}
              >
                Add to Cart
              </button>
            ) : (
              <button className="btn btn-disabled w-full mt-4">Out of Stock</button>
            )}
            <div className="divider my-4"></div>
            <h2 className="text-lg font-bold">Reviews</h2>
            <div className="max-h-40 overflow-auto space-y-3">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review._id} className="flex items-center gap-3">
                    <div className="avatar placeholder">
                      <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                        <span>{review.userName[0].toUpperCase()}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold">{review.userName}</h3>
                      <StarRating rating={review.reviewValue} />
                      <p className="text-gray-500">{review.reviewMessage}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
            <div className="divider my-4"></div>
            <h2 className="text-lg font-bold">Write a review</h2>
            <StarRating rating={rating} handleRatingChange={handleRatingChange} />
            <input
              type="text"
              className="input input-bordered w-full mt-2"
              placeholder="Write a review..."
              value={reviewMsg}
              onChange={(e) => setReviewMsg(e.target.value)}
            />
            <button
              className="btn btn-success w-full mt-2"
              onClick={handleAddReview}
              disabled={!reviewMsg.trim()}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="modal-action">
          <button className="btn" onClick={handleDialogClose}>Close</button>
        </div>
      </div>
    </dialog>
  );
}

export default ProductDetails;