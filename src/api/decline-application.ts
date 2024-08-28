import { client } from "@/api-client.ts";
import { AxiosResponse } from "axios";

export default function declineApplication(response_id: number): Promise<boolean> {
    return client.post<void>(
        `/teams/decline_application?app_id=${response_id}`,
        true
    ).then((response: AxiosResponse<void>) => response.status === 200)
        .catch(() => false);
}
