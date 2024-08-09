import { Button, Container, Flex, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom"
import { HackathonsList } from "@/components/hackathons-list";
import { Header } from "@/components/header";
import { AuthGuard } from "@/components/auth-guard";
import { useEffect, useState } from "react";
import { IHackathon } from "@/models/IHackathon.ts";
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
                    <Button onClick={ () => navigate("/create-hackathon") }>
                        <IconPlus/>
                    </Button>
                </Flex>
                <HackathonsList role='organizer' hackathons={ hackathons }/>
            </Container>
        </AuthGuard>
    );
};
