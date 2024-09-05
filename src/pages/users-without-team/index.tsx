import {Link, useParams} from "react-router-dom"
import {memo, useEffect, useState} from "react";
import {AuthGuard} from "@/components/auth-guard";
import {Header} from "@/components/header";
import {Center, Container, Flex, Loader, Space} from "@mantine/core";
import getParticipantsWithoutTeam from "@/api/get-participants-without-team";
import styles from "@/pages/admin-panel/admin-panel.module.css";
import {IResume} from "@/models/IResume";
import {WithoutTeamBoard} from "@/components/without-team-board";
import {useFetchHackathon} from "@/hooks/use-fetch-hackathon";
import {MembersList} from "@/components/members-list";
import {getCreatedTeams, ICreatedTeam} from "@/api/get-created-teams";
import {toast} from "@/utils/toasts";

export const UsersWithoutTeam = memo(() => {
    const {hackathon_id} = useParams()
    const [hackathon] = useFetchHackathon(hackathon_id)
    const [users, setUsers] = useState<IResume[] | null>()
    const [teams, setTeams] = useState<ICreatedTeam[]>([]);
    useEffect(() => {
        getParticipantsWithoutTeam(hackathon_id).then(data => setUsers(data))
        getCreatedTeams(hackathon_id).then(res => {
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
    }, [])
    if (!hackathon) return <Center w={"100vw"} h={"100vh"}>
        <Loader size={"md"} />
    </Center>
    return (
        <AuthGuard role={"organizer"}>
            <Header variant={"organizer"} size={((users && users.length) || (teams && teams.length)) && hackathon.roles.length && hackathon.roles.length > 2 ? "xl" : "md" } />
            <Container size={((users && users.length) || (teams && teams.length)) && hackathon.roles.length && hackathon.roles.length > 2 ? "xl" : "md" }>
                <Flex justify={"space-between"} wrap={"wrap"} align={"center"}>
                    <h1>Участники без команды</h1>
                    <Link
                        to={ `/admin-panel/${ hackathon_id }` }
                        className={ styles.link }
                    >
                        Вернуться в админ панель
                    </Link>
                </Flex>
                <Space h={"md"} />
                {(users && users.length) || (teams && teams.length) ?
                    ( hackathon.roles.length ?
                        <WithoutTeamBoard resumes={users} hackathon={hackathon} teams={teams} /> :
                        <MembersList hackathon_id={hackathon_id as string} members={users ? users.map(user => user.user) : []} />
                    ) :
                    <Center mt={"xl"}>
                        <h2>Все участники распределились 🥳</h2>
                    </Center>
                }
            </Container>
        </AuthGuard>
    )
});