import {FC, useState} from "react";
import {IResume} from "@/models/IResume";
import {Center, Grid, Loader, Text, Flex, ScrollArea, Button, Tooltip} from "@mantine/core";
import {useFetchHackathon} from "@/hooks/use-fetch-hackathon";
import {WithoutTeamBoardCard} from "@/components/without-team-board-card";
import styles from './without-team-board.module.css'

export const WithoutTeamBoard: FC = ({ resumes, hackathon_id }: { resumes: IResume[], hackathon_id: string }) => {
    const [hackathon] = useFetchHackathon(hackathon_id)
    const [team, setTeam] = useState<string[]>([]);
    const handleClick = (email: string) => {
        if(team.includes(email)) setTeam(team.filter(participant => participant !== email));
        else setTeam([...team, email]);
    };
    const joinTeam = () => {

    }

    if (!hackathon) return <Center w={"100vw"} h={"calc(100vh-65px)"}>
        <Loader size={"md"} />
    </Center>
    return (
        <div>
            <div className={styles.joinBtn}>
                <Tooltip
                    label={
                        team.length < 2
                            ? "В команде должно быть больше 1 участника"
                            : team.length > hackathon.max_participants
                                ? `В команде должно быть не более ${hackathon.max_participants} участн.`
                        : ""
                    }
                    withArrow disabled={!(team.length > hackathon.max_participants || team.length < 2)}
                >
                    <Button
                        size={"sm"}
                        onClick={() => joinTeam()}
                        disabled={team.length < 2 || team.length > hackathon.max_participants}

                    >Объеденить в команду</Button>
                </Tooltip>
            </div>

            <ScrollArea w={"100%"} h={"calc(100vh - 200px)"} scrollbars={"x"}>

                <div
                    className={styles.grid}
                    style={{ gridTemplateColumns: `repeat(${hackathon.roles.length + 1}, 1fr)` }}
                >

                    { hackathon.roles.map((role: string) => {
                        return (
                            <div key={role} className={styles.column}>
                                <Text fw={600} size={"lg"} ta={"center"}>{ role }</Text>
                                <ScrollArea scrollbars={"y"}>
                                    <Flex direction={"column"} gap={"sm"} mt={"sm"}>
                                        { resumes.filter(resume => resume.role == role).map(resume => {
                                            return <WithoutTeamBoardCard key={resume.id} resume={resume} handleClick={handleClick} />
                                        }) }
                                    </Flex>
                                </ScrollArea>
                            </div>
                        )
                    }) }

                    <div className={styles.column}>
                        <Text fw={600} size={"lg"} ta={"center"}>Команды</Text>
                    </div>
                </div>

            </ScrollArea>
        </div>
    )
}