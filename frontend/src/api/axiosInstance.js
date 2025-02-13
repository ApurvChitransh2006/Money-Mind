import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3500/api/", // Change to your API URL
    withCredentials: true
});

export default axiosInstance;
