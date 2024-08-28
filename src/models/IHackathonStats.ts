import {IUser} from "@/models/IUser";

export interface IHackathonStats {
    total_teams: number,
    full_teams: number,
    percent_full_teams: number,
    people_without_teams: IUser[],
    people_in_teams: number,
    invited_people: number,
    accepted_invite: number
}