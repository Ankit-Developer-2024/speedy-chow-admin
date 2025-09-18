import axios from 'axios';
import { BASE_URL } from '../../strings/appUrl';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: { 
    'Content-Type':'application/json',
     'authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Y2M0M2FkODE5M2JhNWNhNTllZTA3NiIsImVtYWlsIjoiYW5raXQwMDFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTgyMTcxMzMsImV4cCI6MTc2MDgwOTEzM30.M6Hi9kSyd4YjrirZSoImGjAWEfZxLE1842IZBY0F460'
}
});