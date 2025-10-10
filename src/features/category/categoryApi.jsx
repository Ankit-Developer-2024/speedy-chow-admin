
import { data } from "react-router";
import { axiosInstance } from "../../app/services/network/axiosInstance";
import { CATEGORY,  } from "../../app/strings/appUrl";


export const fetchCategory = async () => {
    try {
        const response = await axiosInstance.get(CATEGORY)
        return response.data
    } catch (error) {
        return error.response.data;
    }
}

export const createCategory = async (formData) => {
    try {
        const response = await axiosInstance.post(CATEGORY, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
        )
        return response.data
    } catch (error) { 
        return error.response.data
    }
}


export const deleteCategory = async (id) => {
    try {
        const response = await axiosInstance.delete(CATEGORY+id) 
        return response.data
    } catch (error) {
        return error.response.data;
    }
}
 

 