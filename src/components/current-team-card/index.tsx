import { FC, memo } from "react";
import { Avatar, Button, Flex, Text } from "@mantine/core";
import styles from "./current-team-card.module.css";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import {IUser} from "@/models/IUser";

export type CurrentTeamCardProps = {
    hackathonId: string;
    id: number;
    name: string;
    members: IUser[];
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
            align={ isPhoneCard ? 'flex-start' : 'initial' }
        >
            <Flex
                flex="fit-content"
                direction={ isPhoneCard ? 'column' : 'row' }
                gap={ 15 }
                align={ isPhoneCard ? 'flex-start' : 'center' }
                style={{ overflow: "hidden" }}
            >
                <Avatar.Group>
                    {

                        new Array(props.members.length).fill('').map((_, i) =>
                            <Avatar
                                key={ `avatar-${ i }` }
                                name={props.members[i].username} color="initials"
                            />
                        )
                    }
                    {
                        props.maxMembers != props.members.length && <Avatar>+{ props.maxMembers - props.members.length }</Avatar>
                    }
                </Avatar.Group>

                <Text size="md" fw={ 500 } truncate={"end"} mw={"100%"}>{ props.name }</Text>
            </Flex>

            <Button
                px={ isPhoneCard ? 0 : 5 }
                color={"var(--link-color)"}
                variant='transparent'
                rightSection={ <IconArrowNarrowRight size={ 20 }/> }>
                Перейти в команду
            </Button>
        </Flex>
    </Flex>
})