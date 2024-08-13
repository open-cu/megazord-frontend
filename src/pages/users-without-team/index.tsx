import { useParams } from "react-router-dom"
import {memo, useEffect, useState} from "react";
import {IUser} from "@/models/IUser";
import fetchHackathon from "@/api/fetch-hackathon";
import {AuthGuard} from "@/components/auth-guard";
import {Header} from "@/components/header";
import {Center, Container, Space} from "@mantine/core";
import {MembersList} from "@/components/members-list";
import getParticipantsWithoutTeam from "@/api/get-participants-without-team";

export const UsersWithoutTeam = memo(() => {
    const {hackathon_id} = useParams()
    const [users, setUsers] = useState<IUser[] | null>()
    useEffect(() => {
        getParticipantsWithoutTeam(hackathon_id).then(data => setUsers(data))
    }, [])
    return (
        <AuthGuard role={"organizer"}>
            <Header variant={"organizer"} />
            <Container size={"md"}>
                <h1>Участники без команды</h1>
                <Space h={"md"} />
                {users && users.length ?
                    <MembersList hackathon_id={parseInt(hackathon_id as string)} members={users} /> :
                    <Center mt={"xl"}>
                        <h2>Все участники распределились 🥳</h2>
                    </Center>
                }
            </Container>
        </AuthGuard>
    )
});