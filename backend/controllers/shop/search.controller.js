import { Product } from "../../models/product.model.js";

const searchProduct = async (requestAnimationFrame, res) => {
  try {
    const { keyword } = req.params;
    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({success: false, message: "Keyword is required" });
    }
    const regEx = new RegExp(keyword, "i");
    const createSearchQuery = {
      $or: [
        { title: regEx },
        { description: regEx },
        { category: regEx },
        { brand: regEx },
      ],
    };

    const searchResults = await Product.find(createSearchQuery);
    if (!searchResults) {
      return res.status(404).json({success: false, message: "No products found" });
    }
    res.status(200).json({success: true, data: searchResults});
  } catch (error) {
    console.log("Error in getProductDetails", error.message);
    return res.status(500).json({success: false, message: "Internal server error" });
  }
};

export { searchProduct };
