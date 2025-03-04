import { Order } from "../../models/order.model.js";
import { Product } from "../../models/product.model.js";
import { Review } from "../../models/review.model.js";

// Add the review
const addReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } = req.body;
      
    
    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
    });
    if (!order) {
      return res.status(400).json({success: false, message: "You can't review this product" });
    }
    const checkExistinfReview = await Review.findOne({
      productId,
      userId,
    });

    if (checkExistinfReview) {
      return res
        .status(400)
        .json({success: false, message: "You already reviewed this product" });
    }

    const newReview = new Review({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });
    await newReview.save();

    const reviews = await Review.find({ productId });
    const totalReviewsLength = reviews.length;
    const averageReview =
      reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      totalReviewsLength;

    await Product.findByIdAndUpdate(productId, { averageReview });
    return res
      .status(201)
      .json({success: true, message: "Review added successfully",data: newReview });
  } catch (error) {
    console.log("Error in adding review", error.message);
    return res.status(500).json({success: false, message: "Internal server error" });
  }
};

// Get  reviews
const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ productId });
    if (!reviews) {
      return res.status(400).json({success: false, message: "No reviews found" });
    }
    return res.status(200).json({success: true, data: reviews });
  } catch (error) {
    console.log("Error in getting reviews", error.message);
    return res.status(500).json({success: false, message: "Internal server error" });
  }
};

export { addReview, getProductReviews };