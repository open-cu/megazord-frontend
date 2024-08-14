import {client} from "@/api-client.ts";

export interface CreateHackathonPayload {
    name: string,
    description: string,
    min_participants: number,
    max_participants: number,
    participants: string[],
}


export default async function createHackathon(file: File, csvFile: File, data: CreateHackathonPayload): Promise<boolean> {
    const form = new FormData();

    form.append('image_cover', file);
    if (csvFile) form.append('csv_emails', csvFile);
    form.append('body', JSON.stringify({
        ...data,
        min_participants: 1,
    }));

    return await client.post(`/hackathons/`, form).then((res) => true).catch(() => false);
}
