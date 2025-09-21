import { axiosInstance } from "../../app/services/network/axiosInstance"; 
import { CREATE_USER, FETCH_USER, SEARCH_USER, USER } from "../../app/strings/appUrl";


export const fetchAllUser = async(data)=>{
     try {
        const response = await axiosInstance.get(FETCH_USER,{
            params:data
        });
        return response.data
     } catch (error) {
        return error.response.data;
     }
}


export const createUser = async (data) => {
    try {
        const response = await axiosInstance.post(CREATE_USER,data)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const updateUser = async (userData) => {
    try {  
        let {id,data}=userData 
        
        const response = await axiosInstance.patch(USER+id,data)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await axiosInstance.delete(USER+id)
        return response.data
    } catch (error) {
        return error.response.data;
    }
}

export const deleteMultipleUser = async (data) => {
    try {
        const response = await axiosInstance.delete(USER,{data})
        return response.data
    } catch (error) {
        return error.response.data;
    }
}

export const searchUser= async(data)=>{
     try {
        const response = await axiosInstance.get(SEARCH_USER,{
            params:data
        })
        return response.data
    } catch (error) {
        return error.response.data;
    }
}