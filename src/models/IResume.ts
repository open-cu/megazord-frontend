export interface IResume {
    id: number;
    bio: string;
    userId: number;
    hackathonId: number;
    techStack: string[];
    softSkills: string[];
    personalWebsite: string | null;
    githubLink: string | null;
    hhLink: string | null;
    telegram: string | null;
}