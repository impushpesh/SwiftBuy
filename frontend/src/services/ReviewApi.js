import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/shop/review`;

export const addReview = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/add`, formData,  {withCredentials: true});
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered products:", error.response.data);
    throw error.response?.data || { error: "Something went wrong" };
  }
};

export const getProductReviews = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/${productId}`, {withCredentials: true});
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered products:", error.response.data);
    throw error.response?.data || { error: "Something went wrong" };
  }
};
