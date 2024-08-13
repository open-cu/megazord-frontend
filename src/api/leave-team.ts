import {client} from "@/api-client";

export default async function leaveTeam(team_id: number): Promise<boolean> {
    return await client.post<boolean>(`/teams/leave-team?team_id=${team_id}`).then(() => true).catch(() => false);
}