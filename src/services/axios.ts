import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_NODE_ENV === 'development' ? process.env.REACT_APP_API_URL : process.env.REACT_APP_PROD_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;