import {FC, Fragment, useEffect, useState} from "react";
import {IResume} from "@/models/IResume";
import {Center, Loader, Text, Flex, ScrollArea, Button, Tooltip} from "@mantine/core";
import {WithoutTeamBoardCard} from "@/components/without-team-board-card";
import styles from './without-team-board.module.css'
import {IHackathon} from "@/models/IHackathon";
import {joinTeam} from "@/api/join-team";
import {toast} from "@/utils/toasts";
import {useDisclosure} from "@mantine/hooks";
import {getCreatedTeams, ICreatedTeam} from "@/api/get-created-teams";
import {WithoutTeamBoardTeamCard} from "@/components/without-team-board-team-card";

export const WithoutTeamBoard: FC = ({ resumes, hackathon }: { resumes: IResume[], hackathon: IHackathon }) => {
    const [loadingJoinBtn, { toggle: toggleJoinBtn }] = useDisclosure();
    const [emails, setEmails] = useState<string[]>([]);
    const [teams, setTeams] = useState<ICreatedTeam[]>([]);
    useEffect(() => {
        getCreatedTeams(hackathon.id).then(res => {
            if(!res) {
                toast({
                    type: "error",
                    message: "Произошла ошибка при загрузке данных"
                })
                setTeams([])
                return;
            }
            else setTeams(res)
        }).catch(() => setTeams([]))
    }, []);


    const handleClick = (email: string) => {
        if(emails.includes(email)) setEmails(emails.filter(participant => participant !== email));
        else setEmails([...emails, email]);
    };
    const handleJoinTeam = async () => {
        toggleJoinBtn()
        const joinTeamModal = toast({
            loading: true,
            message: "Формируем команду..."
        })
        const response = await joinTeam(hackathon.id, emails)
        if (response) {
            toast({
                id: joinTeamModal,
                type: "success",
                message: "Команда успешно сформирована!"
            })
            window.location.reload()
        }
        else toast({
            id: joinTeamModal,
            type: "error",
            message: "Произошла ошибка при формировании команды"
        })
        toggleJoinBtn()
    }

    return (
        <div>
            <div className={styles.joinBtn}>
                <Tooltip
                    label={
                        emails.length < 2
                            ? "В команде должно быть больше 1 участника"
                            : emails.length > hackathon.max_participants
                                ? `В команде должно быть не более ${hackathon.max_participants} участн.`
                        : ""
                    }
                    withArrow disabled={!(emails.length > hackathon.max_participants || emails.length < 2)}
                >
                    <Button
                        loading={loadingJoinBtn}
                        size={"sm"}
                        onClick={() => handleJoinTeam()}
                        disabled={emails.length < 2 || emails.length > hackathon.max_participants}

                    >Объеденить в команду</Button>
                </Tooltip>
            </div>

            <ScrollArea w={"100%"} h={"calc(100vh - 200px)"} scrollbars={"x"} type="always">

                <div
                    className={styles.grid}
                    style={{ gridTemplateColumns: `repeat(${hackathon.roles.length + 1}, 1fr)` }}
                >

                    { hackathon.roles.map((role: string) => {
                        const participants = resumes.filter(resume => resume.role == role)
                        return (
                            <div key={role} className={styles.column}>
                                <Text fw={600} size={"lg"} ta={"center"}>{ role + ' ' }({participants.length})</Text>
                                <ScrollArea scrollbars={"y"}>
                                    <Flex direction={"column"} gap={"sm"} mt={"sm"}>
                                        { participants.map(resume => {
                                            return <WithoutTeamBoardCard key={resume.id} resume={resume} handleClick={handleClick} />
                                        }) }
                                    </Flex>
                                </ScrollArea>
                            </div>
                        )
                    }) }

                    <div className={styles.column}>
                        <Text fw={600} size={"lg"} ta={"center"}>Команды ({teams.length})</Text>
                        <ScrollArea scrollbars={"y"}>
                            <Flex direction={"column"} gap={"sm"} mt={"sm"}>
                                { (teams && teams.length > 0) ?
                                    <>
                                        { console.log("breakpoint", teams) }
                                        { teams.map((team: ICreatedTeam) => <WithoutTeamBoardTeamCard team={team}/>)}
                                    </>
                                    :
                                    <Text size={"sm"}>Нет вручную сформированных команд</Text>
                                }
                            </Flex>
                        </ScrollArea>
                    </div>
                </div>

            </ScrollArea>
        </div>
    )
}