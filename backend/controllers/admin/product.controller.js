import { Product } from "../../models/product.model.js";
import { imageUploadUtil } from "../../helpers/cloudinary.js";

// Handle image upload
const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

// Create product
const createProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;
    const newProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    });
    if (!newProduct) {
      return res.status(400).json({success: false, message: "Error creating product" });
    }
    await newProduct.save();
    return res.status(201).json({success: true, message: "Product created successfully" });
  } catch (error) {
    console.log("Error in createProduct", error.message);
    return res.status(500).json({success: false, message: "Internal server error" });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({success: true,data:products});
  } catch (error) {
    console.log("Error in getAllProducts", error.message);
    return res.status(500).json({success: false, message: "Internal server error" });
  }
};

// Edit a product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    let findProduct = await Product.findById(id);
    if (!findProduct) {
      return res.status(404).json({success: false, message: "Product not found" });
    }

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;
    findProduct.averageReview = averageReview || findProduct.averageReview;

    await findProduct.save();
    res.status(200).json({success: true, message: "Product updated successfully", data: findProduct });
  } catch (error) {
    console.log("Error in editProduct", error.message);
    return res.status(500).json({success: false, message: "Internal server error" });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const findProduct = await Product.findById(id);
    if (!findProduct) {
      return res.status(404).json({success: false, message: "Product not found" });
    }
    await findProduct.remove();
    return res.status(200).json({success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in deleteProduct", error.message);
    return res.status(500).json({success: false, message: "Internal server error" });
  }
};

export {
  handleImageUpload,
  createProduct,
  getAllProducts,
  editProduct,
  deleteProduct,
};