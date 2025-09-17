import { axiosInstance } from "../../app/services/network/axiosInstance";
import { FETCH_USER } from "../../app/strings/appUrl";


export const fetchAllUser = async()=>{
     try {
        const response = await axiosInstance.get(FETCH_USER);
        return response.data
        
     } catch (error) {
        return error.response.data;
     }
}