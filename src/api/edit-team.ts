import { client } from "@/api-client.ts";
import { AxiosResponse } from "axios";

type EditTeamPayload = {
    name: string;
    vacancies: {
        id?: number;
        name: string;
        keywords: string[];
    }[];
};

export function editTeam(id: number, payload: EditTeamPayload): Promise<boolean> {
    return client.patch<void>(
        `/teams/edit_team?id=${id}`,
        payload,
        true
    ).then((response: AxiosResponse<void>) => response.status === 200).catch(() => false);
}
