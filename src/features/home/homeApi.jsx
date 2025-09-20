
import { data } from "react-router";
import { axiosInstance } from "../../app/services/network/axiosInstance";
import { FETCH_Category, PRODUCT, SEARCH_PRODUCT } from "../../app/strings/appUrl";


export const fetchProduct = async (data) => {
    try {
        const response = await axiosInstance.get(PRODUCT,{
            params:data
        })
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
        return error.response.data
    }
}


export const updateProduct = async (formData,id) => {
    try { 
        const response = await axiosInstance.patch(PRODUCT+id, formData, {
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

export const deleteProduct = async (id) => {
    try {
        const response = await axiosInstance.delete(PRODUCT+id) 
        return response.data
    } catch (error) {
        return error.response.data;
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

export const searchProduct= async(data)=>{
     try {
        const response = await axiosInstance.get(SEARCH_PRODUCT,{
            params:data
        })
        return response.data
    } catch (error) {
        return error.response.data;
    }
}