import axios from "axios";

const API_URL = "http://localhost:5000/api/shop/product";

export const getProductDetails = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/get/${productId}`, {withCredentials: true});
    return response;
  } catch (error) {
    console.error("Error fetching product details:", error.response.data);
    throw error.response?.data || { error: "Something went wrong" };
  }
};

export const getFilteredProducts = async (filterParams, sortParams) => {
  try {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    const response = await axios.get(
      `${API_URL}/get?${query}`,
      {withCredentials: true}
    );

    return response;
  } catch (error) {
    console.error("Error fetching filtered products:", error.response.data);
    throw error.response?.data || { error: "Something went wrong" };
  }
};
