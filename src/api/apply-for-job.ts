import apiClient, {client} from "@/api-client.ts";

export default async function applyForJob(vacation_id: number): Promise<boolean> {
    return await client.post<boolean>(`/teams/apply_for_job?vac_id=${vacation_id}`).then(() => true).catch(() => false);
}

// export default async function applyForJob(vacation_id: number): Promise<boolean> {
//     const response = await apiClient({
//         method: 'post',
//         url: `/teams/apply_for_job?vac_id=${vacation_id}`,
//     })
//     return response.status == 200
// }