import {client} from "@/api-client.ts";

export default async function uploadEmailsCsv(
    hackathon_id: string,
    file: File | null
): Promise<boolean> {
    if (!file) return true;

    const form = new FormData();
    form.append('csv_file', file);

    try {
        const response = await client.post(`/hackathons/${hackathon_id}/upload_emails`, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        if (!response.status || response.status < 200 || response.status >= 300) {
            throw new Error('Ошибка при импорте файла');
        }
    } catch (error) {
        throw new Error(error.message);
    }
}