import {client} from "@/api-client.ts";

export default async function uploadEmailsCsv(
    hackathon_id: number,
    file: File | null
): Promise<boolean> {
    if (!file) return Promise.resolve(true);

    const form = new FormData();
    form.append('csv_file', file);

    const response = await client.post(`/hackathons/${hackathon_id}/upload_emails`, form, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.status === 200;
}