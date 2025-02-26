import { Address } from "../../models/address.model.js";

// Add address
const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;
    if (!userId || !address || !city || !pincode || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });
    await newAddress.save();

    return res
      .status(201)
      .json({ message: "Address added successfully", newAddress });
  } catch (error) {
    console.log("Error in adding address", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update address
const updateAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },

      formData,
      { new: true }
    );

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    return res
      .status(200)
      .json({ message: "Address updated successfully", address });
  } catch (error) {
    console.log("Error in updating address", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete address
const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const address = await Address.findOneAndDelete({
      _id: addressId,
      userId,
    });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    return res
      .status(200)
      .json({ message: "Address deleted successfully", address });
  } catch (error) {
    console.log("Error in deleting address", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get all addresses
const fetchAddresses = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const addresses = await Address.find({ userId });
    if (!addresses) {
      return res.status(404).json({ message: "No addresses found" });
    }
    return res.status(200).json({ addresses });
  } catch (error) {
    console.log("Error in fetching addresses", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { addAddress, updateAddress, deleteAddress, fetchAddresses };