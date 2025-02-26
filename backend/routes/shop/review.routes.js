import express from "express";
import {
  addReview,
  getProductReviews,
} from "../../controllers/shop/review.controller.js";

const router = express.Router();

router.post("/add", addReview);
router.get("/:productId", getProductReviews);

export default router;
