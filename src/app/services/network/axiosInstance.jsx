import axios from 'axios';
import { BASE_URL } from '../../strings/appUrl';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  withCredentials: true,
  headers: { 
    'Content-Type':'application/json',
  }
});

let isRefresh=true;


// axiosInstance.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     //console.log(config);
    
//     return config;
//   }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   });


axiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log("-----response resp",response);
    if(response.config.url!=='auth/refresh-token' && response.config.url!=='auth/check'){
        isRefresh=true;
    }
    
    //if(response)
    return response;
  },async function (error) {
    //console.log("---",error);
    
    const originalReq=error.config  
    
    if(error.response?.status===401 && !originalReq._retry && isRefresh && originalReq.url!=='auth/login' && originalReq.url!=='auth/signup' ){
      try { 
      //  console.log("--interceptors error",error);
      
       isRefresh=false
       await axiosInstance.get('auth/refresh-token') 
       return axiosInstance(originalReq)
      } catch (error) {  
       // console.log("--interceptors catch error",error); 
        //window.location.href='/login'
      }
    }
    
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });  