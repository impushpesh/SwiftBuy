import { Featured } from "../../models/featured.model.js";

// Adding featured image
const addFeaturedImage = async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(404).json({success: false, message: "Image not provided" });
    }
    const featureImages = new Featured({
      image,
    });
    await featureImages.save();

    return res
      .status(200)
      .json({success: true, message: "Image added successfully", data: featureImages });
  } catch (error) {
    console.log("Error in uploading image", error.message);
    return res.status(500).json({success: false, message: "Internal server error" });
  }
};

// Getting featured image
const getFeaturedImage = async (req, res) => {
  try {
    const images = await Featured.find({});
    if (!images) {
      return res.status(404).json({success: false, message: "Images not available" });
    }
    return res.status(200).json({success: true, data: images });
  } catch (error) {
    console.log("Error in getting featured images", error.message);
    return res.status(500).json({success: false, message: "Internal server error" });
  }
};

export { addFeaturedImage, getFeaturedImage };
