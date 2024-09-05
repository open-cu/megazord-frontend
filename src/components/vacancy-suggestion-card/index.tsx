import {FC, memo} from "react";
import styles from "./vacancy-suggestion-card.module.css";
import {Avatar, Badge, Flex, Text} from "@mantine/core";
import {Link} from "react-router-dom";
import {IVacancySuggestion} from "@/models/IVacancySuggestion.ts";
import {HackathonStatus} from "@/models/IHackathon";

export type VacancySuggestionCardProps = {
    maxMembers: number
    hackathonId: string
    suggestion: IVacancySuggestion
    hackathonStatus: HackathonStatus
}

export const VacancySuggestionCard: FC<VacancySuggestionCardProps> = memo(props => {
    return <Link
        to={ `/hackathon/${ props.hackathonId }/teams/${ props.suggestion.team.id }` }
        className={ styles.teamCard }>

        <Text fw={ 500 } size="lg" truncate={"end"}>{ props.suggestion.team.name }</Text>

        <Flex gap={ 8 } mt={ 16 }>
            {
                new Array(props.suggestion.team.members.length).fill('').map((_, i) => {
                    return <Avatar
                        key={ `t-${ props.suggestion.id }-${ i }-1` }
                        name={props.suggestion.team.members[i].name}
                        color="initials"
                    />
                })
            }
            {
                new Array(props.maxMembers - props.suggestion.team.members.length).fill('').map((_, i) => {
                    return <Avatar key={ `t-${ props.suggestion.id }-${ i }-1` }>+</Avatar>
                })
            }
        </Flex>

        {props.hackathonStatus != HackathonStatus.Ended &&
            <>
                <Text fw={ 500 } mt={ 16 } size="md" truncate={"end"}>{ props.suggestion.name }</Text>
                <Flex gap={ 6 } mt={ 4 } direction='row' maw='100%' wrap='wrap'>
                    {
                        props.suggestion.keywords.map((skill, i) => {
                            return <Badge w='fit-content' miw={ 50 } key={i}>
                                <span>{ skill }</span>
                            </Badge>
                        })
                    }
                </Flex>
            </>}
    </Link>
})