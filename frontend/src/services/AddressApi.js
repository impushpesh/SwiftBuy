import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/shop/address`;

export const addAddress = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/add`, formData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding address:", error.response.data);
    throw error.response?.data || { error: "Something went wrong" };
  }
};

export const fetchAddresses = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/get/${userId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching addresses:", error.response.data);
    throw error.response?.data || { error: "Something went wrong" };
  }
};

export const removeAddress = async (userId, addressId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/delete/${userId}/${addressId}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting address:", error.response.data);
    throw error.response?.data || { error: "Something went wrong" };
  }
};

export const updateAddress = async (userId, addressId, formData) => {
  try {
    const response = await axios.put(
      `${API_URL}/update/${userId}/${addressId}`,
      formData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating address:", error.response.data);
    throw error.response?.data || { error: "Something went wrong" };
  }
};
