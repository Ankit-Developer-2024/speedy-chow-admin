import { axiosInstance } from "../../app/services/network/axiosInstance"
import { AUTH_CHECK, AUTH_LOGIN, AUTH_SIGN_UP } from "../../app/strings/appUrl"

export const signUp= async(data)=> {
    try {
        let response = await axiosInstance.post(AUTH_SIGN_UP,data)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const logIn= async(data)=> {
    try {
        let response = await axiosInstance.post(AUTH_LOGIN,data)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const check= async()=> {
    try {
        let response = await axiosInstance.get(AUTH_CHECK)
        return response.data
    } catch (error) {
        return error.response.data
    }
}