import { client } from "@/api-client.ts";
import { AxiosResponse } from "axios";

export type EditResumePayload = {
    bio: string;
    tech: string[];
    soft: string[];
    github: string;
    hh: string;
    telegram: string;
    personalWebsite: string;
};

export function editResume(id: number, payload: EditResumePayload): Promise<boolean> {
    return client.patch<void>(
        '/resumes/edit',
        {
            bio: payload.bio,
            hackathon_id: id,
            tech: payload.tech,
            soft: payload.soft,
            github: payload.github,
            hh: payload.hh,
            telegram: payload.telegram,
            personal_website: payload.personalWebsite,
        },
        true
    ).then((response: AxiosResponse<void>) => response.status === 200).catch(() => false);
}
