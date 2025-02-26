import express from 'express';
import {addAddress, updateAddress, deleteAddress, fetchAddresses} from '../../controllers/shop/address.controller.js';

const router = express.Router();

router.post("/add", addAddress);
router.get("/get/:userId", fetchAddresses);
router.delete("/delete/:userId/:addressId", deleteAddress);
router.put("/update/:userId/:addressId", updateAddress);

export default router;