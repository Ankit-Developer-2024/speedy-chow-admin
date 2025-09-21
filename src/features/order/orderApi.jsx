import { axiosInstance } from "../../app/services/network/axiosInstance"; 
import { FETCH_ORDERS, ORDER } from "../../app/strings/appUrl";


export const fetchAllOrder = async(data)=>{
     try {  
        const response = await axiosInstance.get(FETCH_ORDERS,{
            params:data
        }); 
        return response.data
     } catch (error) { 
        
        return error.response.data;
     }
}

export const updateOrder = async (userData) => {
    try {  
        let {id,data}=userData 
        const response = await axiosInstance.patch(ORDER+id,data)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const deleteOrder = async (id) => {
    try {
        const response = await axiosInstance.delete(ORDER+id)
        return response.data
    } catch (error) {
        return error.response.data;
    }
}

export const deleteMultipleOrder = async (data) => {
    try {
        const response = await axiosInstance.delete(ORDER,{data})
        return response.data
    } catch (error) {
        return error.response.data;
    }
}
