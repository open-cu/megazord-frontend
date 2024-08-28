import { Container, Flex, Text, Anchor } from "@mantine/core";
import { HackathonsList } from "@/components/hackathons-list";
import { Header } from "@/components/header";
import { AuthGuard } from "@/components/auth-guard";
import { useEffect, useState } from "react";
import { IHackathon } from "@/models/IHackathon";
import fetchMyHackathons from "@/api/fetch-my-hackathons";
import userStore from "@/stores/user-store";
import {Link} from "react-router-dom";
import getTelegramLink from "@/api/get-telegram-link";

export const HackathonsUser = () => {
    const [hackathons, setHackathons] = useState<IHackathon[] | null>(null)
    const [tgLink, setTgLink] = useState<null | string>(null);
    const user = userStore(state => state.user)

    useEffect(() => {
        fetchMyHackathons().then(setHackathons)
        getTelegramLink().then(setTgLink)
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
                        ? <Flex mt={ 100 } direction='column' align={{ base: "flex-start", sm: "center"}}>
                            <Text size="lg" fw={"500"}>
                                Вы пока не участвуете ни в одном хакатоне.
                            </Text>
                            <Text>
                                Попросите организаторов пригласить вас по почте&nbsp;
                                <strong>{ user.email ?? '' }</strong>
                            </Text>
                            {tgLink && <Link to={tgLink} target="_blank">
                                <Anchor>Переходи в телеграм бота, чтобы оперативно получать уведомления</Anchor>
                            </Link>}
                        </Flex>
                        : <HackathonsList role='user' hackathons={ hackathons ?? [] }/>
                }
            </Container>
        </AuthGuard>
    );
};
