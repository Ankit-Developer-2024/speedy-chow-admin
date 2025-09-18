import { axiosInstance } from "../../app/services/network/axiosInstance"; 
import { CREATE_USER, FETCH_USER, USER } from "../../app/strings/appUrl";


export const fetchAllUser = async()=>{
     try {
        const response = await axiosInstance.get(FETCH_USER);
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
