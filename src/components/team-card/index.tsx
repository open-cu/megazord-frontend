import { FC, memo } from "react";
import styles from "./team-card.module.css";
import { Avatar, Flex, Text } from "@mantine/core";
import { Link } from "react-router-dom";

export type TeamCardProps = {
    hackathonId: number;
    id: number;
    members: number;
    maxMembers: number;
    name: string;
    vacancies: {
        name: string;
        id: number;
    }[]
}

export const TeamCard: FC<TeamCardProps> = memo(props => {
    return <Link 
        to={`/hackathon/${ props.hackathonId }/teams/${ props.id }`} 
        className={ styles.teamCard }>
        <Flex gap={ 8 }>
            {
                new Array(props.members).fill('').map((_, i) => {
                    return <Avatar key={ `t-${ props.id }-${ i }-1` }/>
                })
            }
            {
                new Array(props.maxMembers - props.members).fill('').map((_, i) => {
                    return <Avatar key={ `t-${ props.id }-${ i }-1` }>+</Avatar>
                })
            }
        </Flex>

        <Text fw={ 500 } mt={ 16 } size="lg">{ props.name }</Text>

        <Flex gap={2} mt={ 16 } direction='column'>
            <Text>
                Подходящие вакансии:
            </Text>

            {
                props.vacancies.map(vacancy => {
                    return <Link
                        key={`vac-${vacancy.id}`}
                        className={styles.link}
                        to={ `/hackathon/${ props.hackathonId }/teams/${ props.id }/vacancy-${ vacancy.id }` }>
                        { vacancy.name }
                    </Link>
                })
            }
        </Flex>
    </Link>
})