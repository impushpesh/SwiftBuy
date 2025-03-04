import axios from 'axios'

const API_URL = "http://localhost:5000/api/admin/product";


export const createProduct = async (formData)=>{
    try{
        const response = await axios.post(`${API_URL}/add`, formData, {
            withCredentials: true
        })
        return response.data
    }catch(error){
        console.error("Error creating product:", error.response.data)
        throw error.response?.data || {error: "Something went wrong"}
    }

}

export const editProduct = async ({ id, formData })=>{
    try{
        const response = await axios.put(`${API_URL}/edit/${id}`, formData, {
            withCredentials: true
        })
        return response.data
    }catch(error){
        console.error("Error editing product:", error.response.data)
        throw error.response?.data || {error: "Something went wrong"}
    }

}

export const deleteProduct = async(id)=>{
    try{
        const response = await axios.delete(`${API_URL}/delete/${id}`, {
            withCredentials: true
        })
        return response.data
    }catch(error){
        console.error("Error deleting product:", error.response.data)
        throw error.response?.data || {error: "Something went wrong"}
    }

}

export const getAllProducts = async()=>{
    try{
        const response = await axios.get(`${API_URL}/get`, {
            withCredentials: true
        })
        return response.data
    }catch(error){
        console.error("Error getting all products:", error.response.data)
        throw error.response?.data || {error: "Something went wrong"}
    }

}