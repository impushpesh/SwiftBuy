import express from "express";
import {
  addFeaturedImage,
  getFeaturedImage,
} from "../../controllers/shop/featured.controller.js";

const router = express.Router();

router.post("/add", addFeaturedImage);
router.get("/get", getFeaturedImage);

export default router;
