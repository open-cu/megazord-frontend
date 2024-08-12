import { useParams } from "react-router-dom"
import {AuthGuard} from "@/components/auth-guard";
import {Header} from "@/components/header";
import {Card, Container, Flex, Button, Text} from "@mantine/core";
import {useEffect, useState} from "react";
import {IconMailForward} from "@tabler/icons-react";

const EMAILS = [
    "BelovBadim2014@yandex.ru",
    "vadim4a@bk.ru",
    "user@user.ru"
]

export const NotAcceptedInvite = () => {
    const {hackathon_id} = useParams()
    const [emails, setEmails] = useState<string[]>([]);
    useEffect(() => {
        // TODO
        setEmails(EMAILS)
    }, []);

    return <AuthGuard role={"organizer"}>
        <Header variant={"organizer"}/>
        <Container size={"md"}>
            <h2>Участники не принявшие приглашение в хакатон</h2>
            <Flex direction={"column"} gap={"md"} mt={"md"}>
                { emails.map((email: string, index: number) => {
                    return <Card padding={"sm"} radius={"md"} withBorder>
                        <Flex direction={"row"} justify={"space-between"} align={"center"}>
                            <Text>{email}</Text>
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