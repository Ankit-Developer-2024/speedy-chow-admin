
import { axiosInstance } from "../../app/services/network/axiosInstance";
import { FETCH_Category, PRODUCT } from "../../app/strings/appUrl";


export const fetchProduct = async () => {
    try {
        const response = await axiosInstance.get(PRODUCT)
        return response.data
    } catch (error) {
        return error.response.data;
    }
}

export const createProduct = async (formData) => {
    try {
        const response = await axiosInstance.post(PRODUCT, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
        )
        return response.data
    } catch (error) {
        console.log(error);
        
        return error.response.data
    }
}

export const fetchCategory = async () => {
    try {
        const response = await axiosInstance.get(FETCH_Category)
        return response.data
    } catch (error) {
        return error.response.data;
    }
}