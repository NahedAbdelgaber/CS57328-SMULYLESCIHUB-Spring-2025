import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000, // 10 seconds
});

export default api;
