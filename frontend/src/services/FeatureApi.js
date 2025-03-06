import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/common/feature`;

export const addFeaturedImage = async (image) => {
  try {
    const response = await axios.post(
      `${API_URL}/add`,
      { image },
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error("Error adding image", error.response.data);
    throw error.response?.data || { error: "Something went wrong" };
  }
};

export const getFeaturedImage = async () => {
  try {
    const response = await axios.get(`${API_URL}/get`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error getting image", error.response.data);
    throw error.response?.data || { error: "Something went wrong" };
  }
};
