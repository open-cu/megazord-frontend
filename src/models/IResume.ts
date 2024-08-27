import {IUser} from "@/models/IUser";

export interface IResume {
    id: string;
    bio: string;
    user: IUser;
    hackathonId: string;
    techStack: string[];
    softSkills: string[];
    personalWebsite: string | null;
    githubLink: string | null;
    hhLink: string | null;
    telegram: string | null;
    role: string;
}