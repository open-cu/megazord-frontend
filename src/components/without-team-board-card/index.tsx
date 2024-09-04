import {FC, useState} from "react";
import {IResume} from "@/models/IResume";
import {Card, Text, Badge, Flex, Center} from "@mantine/core";
import styles from './without-team-board-card.module.css'

export const WithoutTeamBoardCard: FC = ({resume, handleClick}: {resume: IResume, handleClick: (email: string) => void}) => {
    const [active, setActive] = useState<boolean>(false)

    const toggleCard = () => {
        handleClick(resume.user.email)
        setActive(prev => !prev)
    }
    return (
        <Card
            padding="xs"
            radius="sm"
            withBorder
            shadow="sm"
            className={`${active ? styles.active : ""} ${styles.card}`}
            onClick={toggleCard}
        >
            <Text truncate={"end"} size={"md"} fw={600}>{ resume.user.username }</Text>
            <Text truncate={"end"} size={"sm"} >{ resume.user.email }</Text>
            <Flex gap={ 6 } mt={ 4 } direction='row' maw='100%' wrap='wrap'>
                {resume.tech.slice(0, 5).map(skill =>
                    <Center component={Badge} w='fit-content' maw={"100%"} style={{ overflow: "hidden" }} miw={ 40 } size={"xs"}>
                        { skill }
                    </Center>
                )}
            </Flex>
        </Card>
    )
}