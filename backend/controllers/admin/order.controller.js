import { Order } from "../../models/order.model.js";

// Getting all orders
const getAllOrdersOfAllUsers = async (req, res) => {
  try {
    const orders = await Order.find({});
    if (!orders.length) {
      return res.status(404).json({ message: "No orders found" });
    }
    return res.status(200).json(orders);
  } catch (error) {
    console.log("Error in getting order", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Order details for admin
const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "No order found" });
    }
    return res.status(200).json(order);
  } catch (error) {
    console.log("Error in getting order", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "No order found" });
    }

    await Order.findByIdAndUpdate(id, { orderStatus });
    return res
      .status(200)
      .json({ message: "Order status updated successfully" });
  } catch (error) {
    console.log("Error in updating order status", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { getAllOrdersOfAllUsers, getOrderDetailsForAdmin, updateOrderStatus };