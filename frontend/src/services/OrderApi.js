import axios from "axios";

const API_URL = "http://localhost:5000/api/shop/order";

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, orderData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error.response.data);
    throw error.response?.data || { error: "Something went wrong" };
  }
};

export const capturePayment = async ({ paymentId, payerId, orderId }) => {
  try {
    const response = await axios.post(
      `${API_URL}/capture`,
      { paymentId, payerId, orderId },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error capturing payment:", error.response.data);
    throw error.response?.data || { error: "Something went wrong" };
  }
};

export const getAllOrdersByUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/list/${userId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error.response.data);
    throw error.response?.data || { error: "Something went wrong" };
  }
};

export const getOrderDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/details/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching order details:", error.response.data);
    throw error.response?.data || { error: "Something went wrong" };
  }
};
