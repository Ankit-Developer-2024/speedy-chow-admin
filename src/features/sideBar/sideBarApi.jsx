import { axiosInstance } from "../../app/services/network/axiosInstance"
import { AUTH_SIGN_OUT, USER } from "../../app/strings/appUrl"


export const getUser= async()=> {
    try {
        let response = await axiosInstance.get(USER)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const signOut= async()=> {
    try {
        let response = await axiosInstance.get(AUTH_SIGN_OUT)
        return response.data
    } catch (error) {
        return error.response.data
    }
}