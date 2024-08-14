import { useParams, useNavigate } from "react-router-dom"
import {AuthGuard} from "@/components/auth-guard";
import {Header} from "@/components/header";
import {Card, Container, Flex, Button, Text, Center, Loader} from "@mantine/core";
import {useEffect, useState} from "react";
import {IconMailForward} from "@tabler/icons-react";
import {useFetchHackathon} from "@/hooks/use-fetch-hackathon";
import {IUser} from "@/models/IUser";

export const InvitedUsers = () => {
    const {hackathon_id} = useParams()
    const hackathon = useFetchHackathon(hackathon_id)
    const navigate = useNavigate()

    if(!hackathon) return <Center w={"100vw"} h={"calc(100vh-65px)"}>
        <Loader size={"md"} />
    </Center>
    return <AuthGuard role={"organizer"}>
        <Header variant={"organizer"}/>
        <Container size={"md"}>
            <h1>Приглашенные участники</h1>
            {hackathon.participants.length ?<Flex direction={"column"} gap={"md"} mt={"md"}>
                { hackathon.participants.map((participant: IUser, index: number) => {
                    return <Card padding={"sm"} radius={"md"} withBorder key={index}>
                        <Flex direction={"row"} justify={"space-between"} align={"center"}>
                            <Text fw={500}>{participant.email}</Text>
                            <Button size={"xs"} variant={"light"}>
                                <IconMailForward stroke={1} />
                            </Button>
                        </Flex>
                    </Card>
                }) }
            </Flex> : <Flex direction={"column"} justify={"center"} align={"center"} mt={"xl"} gap={"sm"}>
                <Text size={"xl"}>Вы никого не добавили в список приглашенных участников</Text>
                <Button size={"sm"} onClick={() => navigate(`/change-hackathon/${hackathon_id}/`)}>Добавить</Button>
            </Flex> }
        </Container>
    </AuthGuard>
}