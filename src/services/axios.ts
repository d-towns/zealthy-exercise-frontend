import axios from "axios";
import { getEnvironmentApiUrl } from "../utils/utils";

const axiosInstance = axios.create({
    baseURL: getEnvironmentApiUrl(),
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;