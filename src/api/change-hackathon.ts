import apiClient, {client} from "@/api-client.ts";

interface ChangeHackathonPayload {
    name: string,
    description: string,
    max_participants: number,
}

export default async function changeHackathon(
    hackathon_id: string,
    file: File | null,
    data: ChangeHackathonPayload
): Promise<boolean> {
    if (file) {
        const form = new FormData();
        form.append('image_cover', file);
        await apiClient.post(`/hackathons/${hackathon_id}/change_photo`, form);
    }

    try {
        const response = await apiClient.patch(`/hackathons/${hackathon_id}`, {
            ...data,
            min_participants: 1,
        });
        if (!response.status || response.status < 200 || response.status >= 300) {
            throw new Error('Ошибка при импорте файла');
        }
    } catch (error) {
        throw new Error(error.message);
    }
}