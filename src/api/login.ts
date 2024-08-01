import apiClient from "@/api-client.ts";

type LoginPayload = {
    email: string;
    password: string;
}

type LoginResponse = 'invalid-credentials' | string | null

export default async function login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await apiClient({
        method: 'post',
        url: '/auth/signin',
        data: payload,
    })
    
    if (response.status === 200 && response.data.token != null) {
        return response.data.token
    }
    
    if (response.status === 401 || response.status === 400) {
        return 'invalid-credentials'
    }
    
    return null;
}