import express from 'express';
import {handleImageUpload, createProduct, getAllProducts, editProduct, deleteProduct} from '../../controllers/admin/product.controller.js';
import {upload} from '../../helpers/cloudinary.js'
const router= express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", createProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/get", getAllProducts);

export default router