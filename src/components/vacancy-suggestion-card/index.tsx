import { FC, memo } from "react";
import styles from "./vacancy-suggestion-card.module.css";
import { Avatar, Badge, Flex, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { IVacancySuggestion } from "@/models/IVacancySuggestion.ts";

export type VacancySuggestionCardProps = {
    maxMembers: number
    hackathonId: number
    suggestion: IVacancySuggestion
}

export const VacancySuggestionCard: FC<VacancySuggestionCardProps> = memo(props => {
    return <Link
        to={ `/hackathon/${ props.hackathonId }/teams/${ props.suggestion.team.id }` }
        className={ styles.teamCard }>

        <Text fw={ 500 } size="lg">{ props.suggestion.name }</Text>

        <Flex gap={ 8 } mt={ 16 }>
            {
                new Array(props.suggestion.team.members.length).fill('').map((_, i) => {
                    return <Avatar key={ `t-${ props.suggestion.id }-${ i }-1` }/>
                })
            }
            {
                new Array(props.maxMembers - props.suggestion.team.members.length).fill('').map((_, i) => {
                    return <Avatar key={ `t-${ props.suggestion.id }-${ i }-1` }>+</Avatar>
                })
            }
        </Flex>

        <Text fw={ 500 } mt={ 16 } size="md">{ props.suggestion.team.name }</Text>

        <Flex gap={ 6 } mt={ 4 } direction='row' maw='100%' flex='wrap'>
            {
                props.suggestion.keywords.map(skill => {
                    return <Badge w='fit-content' miw={ 50 }>
                        <span>{ skill }</span>
                    </Badge>
                })
            }
        </Flex>
    </Link>
})