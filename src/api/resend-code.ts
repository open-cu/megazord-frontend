import apiClient from "@/api-client.ts";

export default async function resendCode(email: string): Promise<boolean> {
    const response = await apiClient({
        method: 'post',
        url: '/auth/resend_code',
        data: {
            email: email,
        },
    });
    return response.status === 200
}