import { client } from "@/api-client.ts";
import { AxiosResponse } from "axios";

export default function deleteParticipant(team_id: string, email: string): Promise<boolean> {
    return client.delete<void>(
        `/teams/${team_id}/remove_user`,
        {
            email: email
        },
        true
    ).then((response: AxiosResponse<void>) => response.status === 202).catch(() => false);
}
