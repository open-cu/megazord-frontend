import {useParams, useNavigate, Link} from "react-router-dom"
import {AuthGuard} from "@/components/auth-guard";
import {Header} from "@/components/header";
import {Card, Container, Flex, Button, Text, Center, Loader} from "@mantine/core";
import {useEffect, useState} from "react";
import {IconMailForward} from "@tabler/icons-react";
import {useFetchHackathon} from "@/hooks/use-fetch-hackathon";
import getNotAcceptedInvite, {NotAcceptedInviteUnit} from "@/api/get-not-accepted-invite";
import {sendEmailInvitesFunc} from "@/utils/sendInvites";
import styles from "@/pages/admin-panel/admin-panel.module.css";

export const InvitedUsers = () => {
    const {hackathon_id} = useParams()
    const [hackathon] = useFetchHackathon(hackathon_id)
    const [participants, setParticipants] = useState<NotAcceptedInviteUnit[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        getNotAcceptedInvite(hackathon_id).then(data => setParticipants(data))
    }, []);

    if(!hackathon) return <Center w={"100vw"} h={"calc(100vh-65px)"}>
        <Loader size={"md"} />
    </Center>
    return <AuthGuard role={"organizer"}>
        <Header variant={"organizer"}/>
        <Container size={"md"}>
            <Flex justify={"space-between"} wrap={"wrap"} align={"center"}>
                <h1>Приглашенные участники</h1>
                <Link
                    to={ `/admin-panel/${ hackathon_id }` }
                    className={ styles.link }
                >
                    Вернуться в админ панель
                </Link>
            </Flex>
            {participants.length ?<Flex direction={"column"} gap={"md"} mt={"md"}>
                { participants.map((unit: NotAcceptedInviteUnit, index: number) => {
                    return <Card padding={"sm"} radius={"md"} withBorder key={index}>
                        <Flex direction={"row"} justify={"space-between"} align={"center"}>
                            <Text fw={500}>{unit.email}</Text>
                            <Button
                                size={"xs"}
                                variant={"light"}
                                onClick={() => sendEmailInvitesFunc(unit.email, hackathon_id)}
                            >
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