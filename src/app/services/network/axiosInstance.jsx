import axios from 'axios';
import { BASE_URL } from '../../strings/appUrl';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: { 
    'Content-Type':'application/json',
     'authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Y2VjZTg5ZWU5ODgwMDU2YmM0MDE0ZCIsImVtYWlsIjoiYW5raXRiaXJhbmlhOTkwQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU4MzgzNzk4LCJleHAiOjE3NjA5NzU3OTh9.6wXZxQLauNYsc2pn1J7VyK2kaZSI7-GH_znot7BsCwM'
}
});