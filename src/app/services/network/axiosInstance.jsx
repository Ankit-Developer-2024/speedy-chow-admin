import axios from 'axios';
import { BASE_URL } from '../../strings/appUrl';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: { 
     'authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODllOWIzYjk1MTY4MTk1M2MxZGUwZSIsImVtYWlsIjoiYW5raXQwMDFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTc5NTAzMTQsImV4cCI6MTc2MDU0MjMxNH0.Vx_3lAhh3uc3mYzqOkQZHwZeT70zK_vUcuYy-8sCVKU'
}
});