import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

export const signUpUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    console.error("Error signing up user:", error.response.data);
    throw error.response?.data || { error: "Something went wrong" };
  }
};

export const signInUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, userData, {
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
        const response = await axios.post(`${API_URL}/signout`, {}, {
            withCredentials: true, 
        });
        return response.data;
    } catch (error) {
        console.error("Error logging out user:", error.response?.data);
        throw error.response?.data || { error: "Something went wrong" };
    }
  };