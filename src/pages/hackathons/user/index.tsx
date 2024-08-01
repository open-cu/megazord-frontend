import { Container, Flex, Text } from "@mantine/core";
import { HackathonsList } from "@/components/hackathons-list";
import { Header } from "@/components/header";
import { AuthGuard } from "@/components/auth-guard";
import { useEffect, useState } from "react";
import { IHackathon } from "@/models/IHackathon";
import fetchMyHackathons from "@/api/fetch-my-hackathons";
import userStore from "@/stores/user-store";

export const HackathonsUser = () => {
    const [hackathons, setHackathons] = useState<IHackathon[] | null>(null)
    const user = userStore(state => state.user)

    useEffect(() => {
        fetchMyHackathons().then(setHackathons)
    }, [])

    return (
        <AuthGuard role='user'>
            <Header variant='default'/>
            <Container>
                <Text size="xl" mb="md">
                    Ваши хакатоны
                </Text>
                {
                    hackathons?.length == 0
                        ? <Flex mt={ 100 } direction='column'>
                            <Text size="lg" ta='center'>
                                Вы пока не участвуете ни в одном хакатоне.
                            </Text>
                            <Text ta='center'>
                                Попросите организаторов пригласить вас по почте&nbsp;
                                <strong>{ user?.email ?? '' }</strong>
                            </Text>
                        </Flex>
                        : <HackathonsList role='user' hackathons={ hackathons ?? [] }/>
                }
            </Container>
        </AuthGuard>
    );
};
