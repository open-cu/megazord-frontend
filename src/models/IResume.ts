export interface IResume {
    id: string;
    bio: string;
    userId: number;
    hackathonId: string;
    techStack: string[];
    softSkills: string[];
    personalWebsite: string | null;
    githubLink: string | null;
    hhLink: string | null;
    telegram: string | null;
    role: string;
}