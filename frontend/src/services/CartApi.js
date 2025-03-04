import axios from "axios";

const API_URL = "http://localhost:5000/api/shop/cart";

export const addToCart = async ({ userId, productId, quantity }) => {
  try {
    const response = await axios.post(
      `${API_URL}/add`,
      { userId, productId, quantity },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error.response.data);
    throw error.response?.data || { error: "Something went wrong" };
  }
};

export const fetchCartItems = async(userId)=>{
    try {
        const response = await axios.get(`${API_URL}/get/${userId}`, {
        withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching cart items:", error.response.data);
        throw error.response?.data || { error: "Something went wrong" };
    }
}

export const updateCartItemQty = async ({ userId, productId, quantity }) => {
  try {
    const response = await axios.put(
      `${API_URL}/update-cart`,
      { userId, productId, quantity },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating cart item quantity:", error.response.data);
    throw error.response?.data || { error: "Something went wrong" };
  }
}

export const deleteCartItem = async ({ userId, productId }) => {
    try {
        const response = await axios.delete(`${API_URL}/${userId}/${productId}`, {
        withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting cart item:", error.response.data);
        throw error.response?.data || { error: "Something went wrong" };
    }
}