import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/shop/search`;

export const searchProducts = async (keyword) => {
  try {
    const response = await axios.get(`${API_URL}/${keyword}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered products:", error.response.data);
    throw error.response?.data || { error: "Something went wrong" };
  }
};
