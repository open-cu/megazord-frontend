import {FC, memo, ReactNode, useEffect, useState} from 'react';
import {IHackathonStats} from "@/models/IHackathonStats";
import {Center, Loader, Space, Text, Flex, Container, Card, Button, Group, Grid, SimpleGrid} from '@mantine/core'
import {Link, useNavigate} from "react-router-dom";
import {fetchHackathonStats} from "@/api/fetch-hackathon-stats";
import { useParams } from "react-router-dom";
import {HackathonStatsCard} from "@/components/hackathon-stats-card";

export const HackathonStats = memo(() => {
    const navigate = useNavigate()
    const { hackathon_id } = useParams();
    const [stats, setStats] = useState<IHackathonStats | null>();
    useEffect(() => {
        fetchHackathonStats(hackathon_id).then(data => setStats(data))
    }, []);

    if(!stats)
        return <Center w='100%'>
            <Loader size="md"/>
        </Center>
    return (
        <SimpleGrid
            cols={{ base: 1, sm: 2 }}
            mt={"md"}
        >
            <HackathonStatsCard
                title={"Всего участников хакатона"}
                stat={stats.accepted_invite}
                linkTitle={"Список всех участников"}
                link={`/hackathon/${hackathon_id}`}
            />
            <HackathonStatsCard
                title={"Всего команд в хакатоне"}
                stat={stats.total_teams}
                linkTitle={"Список команд"}
                link={`/hackathon/${hackathon_id}/org/teams`}
            />
            <HackathonStatsCard
                title={"Участников без команды"}
                stat={stats.people_without_teams.length}
                linkTitle={"Список участников без команды"}
                link={`/admin-panel/${hackathon_id}/without-team`}
            />
            <HackathonStatsCard
                title={"Приглашение в хакатон приняли"}
                stat={`${stats.accepted_invite} / ${stats.invited_people}`}
                linkTitle={"Почты участников не принявших приглашение"}
                link={`/admin-panel/${hackathon_id}/not-accept-invite`}
            />
        </SimpleGrid>
    );
});
