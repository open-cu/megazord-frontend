import {Link, useParams} from "react-router-dom"
import {memo, useEffect, useState} from "react";
import {IUser} from "@/models/IUser";
import {AuthGuard} from "@/components/auth-guard";
import {Header} from "@/components/header";
import {Center, Container, Space, Flex, Loader} from "@mantine/core";
import {MembersList} from "@/components/members-list";
import getParticipantsWithoutTeam from "@/api/get-participants-without-team";
import styles from "@/pages/admin-panel/admin-panel.module.css";
import {IResume} from "@/models/IResume";
import {WithoutTeamBoard} from "@/components/without-team-board";
import {useFetchHackathon} from "@/hooks/use-fetch-hackathon";

export const UsersWithoutTeam = memo(() => {
    const {hackathon_id} = useParams()
    const [users, setUsers] = useState<IResume[] | null>()
    useEffect(() => {
        getParticipantsWithoutTeam(hackathon_id).then(data => setUsers(data))
    }, [])
    return (
        <AuthGuard role={"organizer"}>
            <Header variant={"organizer"} />
            <Container size={"md"}>
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
                {users && users.length ?
                    // <MembersList hackathon_id={hackathon_id as string} members={users.map(user => user.user)} /> :
                    <WithoutTeamBoard resumes={users} hackathon_id={hackathon_id} /> :
                    <Center mt={"xl"}>
                        <h2>Все участники распределились 🥳</h2>
                    </Center>
                }
            </Container>
        </AuthGuard>
    )
});