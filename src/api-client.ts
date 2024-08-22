import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Инициализация axios экземпляра
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_CLIENT,
    validateStatus: (status) => status != 500,
});

apiClient.interceptors.request.use((config) => {
    const authToken = localStorage.getItem("auth_token");
    if (authToken) {
        config.headers['Authorization'] = `Bearer ${authToken}`;
    }
    return config;
});

class HttpClient {
    // Метод GET
    async get<T>(url: string, fullResponse: boolean = false): Promise<T | AxiosResponse<T>> {
        return this.makeRequest<T>({ method: 'get', url }, fullResponse);
    }

    // Метод POST
    async post<T>(url: string, body: any, fullResponse: boolean = false): Promise<T | AxiosResponse<T>> {
        return this.makeRequest<T>({ method: 'post', url, data: body }, fullResponse);
    }

    // Метод PUT
    async put<T>(url: string, body: any, fullResponse: boolean = false): Promise<T | AxiosResponse<T>> {
        return this.makeRequest<T>({ method: 'put', url, data: body }, fullResponse);
    }

    // Метод PATCH
    async patch<T>(url: string, body: any, fullResponse: boolean = false): Promise<T | AxiosResponse<T>> {
        return this.makeRequest<T>({ method: 'patch', url, data: body }, fullResponse);
    }

    // Метод DELETE
    async delete<T>(url: string, fullResponse: boolean = false): Promise<T | AxiosResponse<T>> {
        return this.makeRequest<T>({ method: 'delete', url }, fullResponse);
    }

    // Универсальный метод для выполнения запросов
    private async makeRequest<T>(config: AxiosRequestConfig, fullResponse: boolean): Promise<T | AxiosResponse<T>> {
        try {
            const response: AxiosResponse<T> = await apiClient(config);
            return fullResponse ? response : response.data;
        } catch (error) {
            // Обработка ошибок
            if (axios.isAxiosError(error)) {
                const status = error.response?.status;
                const message = error.message;
                // Вы можете добавить дополнительную обработку ошибок здесь
                throw new Error(`API request failed with status ${status}: ${message}`);
            } else {
                throw new Error(`Unexpected error: ${error}`);
            }
        }
    }
}

export const client = new HttpClient();
export default apiClient;
