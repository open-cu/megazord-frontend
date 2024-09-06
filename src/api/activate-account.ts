import {client} from "@/api-client.ts";

export default async function activateAccount(email: string, code: string): Promise<boolean | string> {
    const response = await client.post('/auth/activate', { email: email.toLowerCase(), code: code }, true)
    if (response.status === 200) return response.data.token
    else return ""
}