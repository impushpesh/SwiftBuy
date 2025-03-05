import { Order } from "../../models/order.model.js";

// Getting all orders
const getAllOrdersOfAllUsers = async (req, res) => {
  try {
    const orders = await Order.find({});
    if (!orders.length) {
      return res.status(404).json({success: false, message: "No orders found" });
    }
    return res.status(200).json({success: true, data: orders});
  } catch (error) {
    console.log("Error in getting order", error.message);
    return res.status(500).json({success: false, message: "Internal server error" });
  }
};

// Order details for admin
const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({success: false, message: "No order found" });
    }
    return res.status(200).json({success: true, data: order});
  } catch (error) {
    console.log("Error in getting order", error.message);
    return res.status(500).json({success: false, message: "Internal server error" });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({success: false, message: "No order found" });
    }

    await Order.findByIdAndUpdate(id, { orderStatus });
    return res
      .status(200)
      .json({success: true, message: "Order status updated successfully" });
  } catch (error) {
    console.log("Error in updating order status", error.message);
    return res.status(500).json({success: false, message: "Internal server error" });
  }
};

export { getAllOrdersOfAllUsers, getOrderDetailsForAdmin, updateOrderStatus };