import {client} from "@/api-client.ts";

export default async function activateAccount(email: string, code: string): Promise<boolean> {
    const response = await client.post('/auth/activate', { email: email, code: code }, true)
    return response.status === 200
}