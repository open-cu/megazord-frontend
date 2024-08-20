import apiClient from "@/api-client.ts";

export default async function activateAccount(email: string, code: string): Promise<boolean> {
    const response = await apiClient({
        method: 'post',
        url: '/auth/activate',
        data: {
            email: email,
            code: code,
        },
    });
    return response.status === 200
}