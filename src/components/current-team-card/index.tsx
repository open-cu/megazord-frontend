import { FC, memo } from "react";
import { Avatar, Button, Flex, Text } from "@mantine/core";
import styles from "./current-team-card.module.css";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

export type CurrentTeamCardProps = {
    hackathonId: number;
    id: number;
    name: string;
    members: number;
    maxMembers: number;
}

export const CurrentTeamCard: FC<CurrentTeamCardProps> = memo(props => {
    const isPhoneCard = useMediaQuery('(max-width: 635px)');
    const navigate = useNavigate()
    
    const onClick = () => navigate(`/hackathon/${props.hackathonId}/teams/${props.id}`)

    return <Flex direction="column" gap={ 7 } onClick={onClick} mb="xl">
        <div className={ styles.titleContainer }>
            Вы состоите в команде
        </div>
        <Flex
            justify="space-between"
            p={ 12 }
            mt={ 1 }
            className={ styles.card }
            direction={ isPhoneCard ? 'column' : 'row' }
            align={ isPhoneCard ? 'flex-start' : 'initial' }>
            <Flex
                flex="fit-content"
                direction={ isPhoneCard ? 'column' : 'row' }
                gap={ 15 }
                align={ isPhoneCard ? 'flex-start' : 'center' }>
                <Avatar.Group>
                    {
                        new Array(props.members).fill('').map((_, i) => <Avatar key={ `avatar-${ i }` }/>)
                    }
                    {
                        props.maxMembers != props.members && <Avatar>+{ props.maxMembers - props.members }</Avatar>
                    }
                </Avatar.Group>

                <Text size="md" fw={ 500 }>{ props.name }</Text>
            </Flex>

            <Button
                px={ isPhoneCard ? 0 : 5 }
                variant='transparent'
                rightSection={ <IconArrowNarrowRight size={ 20 }/> }>
                Перейти в команду
            </Button>
        </Flex>
    </Flex>
})