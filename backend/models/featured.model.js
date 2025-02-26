import mongoose from "mongoose";

const FeaturedSchema = new mongoose.Schema(
  {
    image: String,
  },
  { timestamps: true }
);

export const Featured = mongoose.model("Featured", FeaturedSchema);
