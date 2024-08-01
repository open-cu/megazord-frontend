import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_CLIENT,
    validateStatus: (status) => status != 500,
})

apiClient.interceptors.request.use((config) => {
    const authToken = localStorage.getItem("auth_token")

    if (authToken) {
        config.headers['Authorization'] = `Bearer ${authToken}`
    }

    return config
})

export default apiClient