import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/admin/order`;

export const getAllOrdersOfAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/get`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error getting all orders:", error.response.data);
    throw error.response?.data || { error: "Something went wrong" };
  }
};

export const getOrderDetailsForAdmin = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/details/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error getting order details:", error.response.data);
    throw error.response?.data || { error: "Something went wrong" };
  }
};

export const updateOrderStatus = async (id, orderStatus) => {
  try {
    const response = await axios.put(
      `${API_URL}/update/${id}`,
      { orderStatus },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error.response.data);
    throw error.response?.data || { error: "Something went wrong" };
  }
};
