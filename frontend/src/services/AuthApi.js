import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const signUpUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, formData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error signing up user:", error.response.data);
    throw error.response?.data || { error: "Something went wrong" };
  }
};

export const signInUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, formData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error.response?.data);
    throw error.response?.data || { error: "Something went wrong" };
  }
};

export const signOutUser = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/signout`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error logging out user:", error.response?.data);
    throw error.response?.data || { error: "Something went wrong" };
  }
};

export const checkAuth = async () => {
  try {
    const response = await axios.get(`${API_URL}/check-auth`, {
      withCredentials: true,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error checking auth:", error.response?.data);
    throw error.response?.data || { error: "Something went wrong" };
  }
};
