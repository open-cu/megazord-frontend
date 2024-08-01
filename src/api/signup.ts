import apiClient from "@/api-client.ts";

export type SignupPayload = {
    name: string;
    email: string;
    password: string;
}

export type SignupResponse =  'email-already-in-use' | null | true

export default async function signup(payload: SignupPayload, isOrganization: boolean): Promise<SignupResponse> {
    const response = await apiClient({
        method: 'post',
        url: '/auth/signup',
        data: {
            username: payload.name,
            email: payload.email,
            password: payload.password,
            is_organizator: isOrganization,
        }
    })
    
    if (response.status === 201) {
        return true
    }
    
    if (response.status === 409) {
        return 'email-already-in-use';
    }
    
    return null
}