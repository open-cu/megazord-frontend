import { useParams } from "react-router-dom"
import {AuthGuard} from "@/components/auth-guard";
import {Header} from "@/components/header";
import {Card, Container, Flex, Button, Text} from "@mantine/core";
import {useEffect, useState} from "react";
import {IconMailForward} from "@tabler/icons-react";
import getNotAcceptedInvite from "@/api/get-not-accepted-invite";

export const NotAcceptedInvite = () => {
    const {hackathon_id} = useParams()
    const [emails, setEmails] = useState<string[]>([]);
    useEffect(() => {
        getNotAcceptedInvite(hackathon_id).then(data => setEmails(data))
    }, []);

    return <AuthGuard role={"organizer"}>
        <Header variant={"organizer"}/>
        <Container size={"md"}>
            <Flex justify={"space-between"} align={"center"}>
                <h2>Участники не принявшие приглашение в хакатон</h2>
                <Button size={"xs"}>Повторно пригласить всех</Button>
            </Flex>
            <Flex direction={"column"} gap={"md"} mt={"md"}>
                { emails.map((email: string, index: number) => {
                    return <Card padding={"sm"} radius={"md"} withBorder key={index}>
                        <Flex direction={"row"} justify={"space-between"} align={"center"}>
                            <Text fw={500}>{email}</Text>
                            <Button size={"xs"} variant={"light"}>
                                <IconMailForward stroke={1} />
                            </Button>
                        </Flex>
                    </Card>
                }) }
            </Flex>
        </Container>
    </AuthGuard>
}