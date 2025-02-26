import { Featured } from "../../models/featured.model.js";

// Adding featured image
const addFeaturedImage = async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(404).json({ message: "Image not provided" });
    }
    const featureImages = new Featured({
      image,
    });
    await featureImages.save();

    return res
      .status(200)
      .json({ message: "Image added successfully", featureImages });
  } catch (error) {
    console.log("Error in uploading image", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Getting featured image
const getFeaturedImage = async (req, res) => {
  try {
    const images = await Featured.find({});
    if (!images) {
      return res.status(404).json({ message: "Images not available" });
    }
    return res.status(200).json({ images });
  } catch (error) {
    console.log("Error in getting featured images", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { addFeaturedImage, getFeaturedImage };
