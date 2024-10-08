import {Button, Container, Flex, Text, ActionIcon, Tooltip} from "@mantine/core";
import {IconPlus} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom"
import {HackathonsList} from "@/components/hackathons-list";
import {Header} from "@/components/header";
import {AuthGuard} from "@/components/auth-guard";
import {useEffect, useState} from "react";
import {IHackathon} from "@/models/IHackathon.ts";
import fetchMyHackathons from "@/api/fetch-my-hackathons.ts";

export const HackathonsOrg = () => {
    const [hackathons, setHackathons] = useState<IHackathon[]>([])

    useEffect(() => {
        fetchMyHackathons().then(setHackathons)
    }, [])

    const navigate = useNavigate();

    return (
        <AuthGuard role='organizer'>
            <Header variant='default'/>
            <Container>
                <Flex justify="space-between">
                    <Text size="xl" mb="md">
                        Ваши хакатоны
                    </Text>
                    <Tooltip label={"Создать новый хакатон"} withArrow>
                        <ActionIcon onClick={ () => navigate("/create-hackathon") } radius="sm">
                            <IconPlus style={{ width: '80%', height: '80%' }} stroke={1.6} />
                        </ActionIcon>
                    </Tooltip>
                </Flex>
                {hackathons.length > 0 ?
                    <HackathonsList role='organizer' hackathons={ hackathons }/> :
                    <Text size="lg" ta='center' fw={"600"} mt={"lg"}>
                        Вы пока не создали ни одного хакатона
                    </Text>
                }
            </Container>
        </AuthGuard>
    );
};
