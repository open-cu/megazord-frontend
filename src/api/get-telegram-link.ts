import { client } from "@/api-client.ts";

export default async function getTelegramLink(): Promise<void> {
    const response = await client.get<string>(`/generate_telegram_link`)
    return response.telegram_link
}
