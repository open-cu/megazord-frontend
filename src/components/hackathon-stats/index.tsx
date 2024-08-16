import {FC, memo, ReactNode, useEffect, useState} from 'react';
import {IHackathonStats} from "@/models/IHackathonStats";
import {Center, Loader, Space, Text, Flex, Container, Card, Button, Group, Grid, SimpleGrid, ActionIcon} from '@mantine/core'
import {Link, useNavigate} from "react-router-dom";
import {fetchHackathonStats} from "@/api/fetch-hackathon-stats";
import { useParams } from "react-router-dom";
import {HackathonStatsCard} from "@/components/hackathon-stats-card";
import {IconDownload} from "@tabler/icons-react";
import {getParticipantsCsv} from "@/api/get-participants-csv";

export const HackathonStats = memo(() => {
    const downloadCsv = (csvString: string) => {
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.csv'); // Установите имя файла для загрузки
        document.body.appendChild(link);
        link.click();

        // Очистка ссылки после загрузки
        document.body.removeChild(link);
    };

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
            <Card padding="md" radius="sm" withBorder>
                <Flex
                    gap="sm"
                    justify="center"
                    align="center"
                    direction="column"
                >
                    <Text size={"md"} fw={500}>Всего участников хакатона</Text>
                    <Text size={"2rem"} c={"blue"} fw={600}>{stats.accepted_invite}</Text>
                    <Flex gap={"xs"} p={0} m={0}>
                        <Button
                            size={"xs"}
                            variant={"light"}
                            onClick={() => navigate(`/hackathon/${hackathon_id}`)}
                        >Список всех участников</Button>
                        <ActionIcon size={"bg"} variant="light" aria-label="Download" onClick={() => getParticipantsCsv(hackathon_id).then(res => downloadCsv(res))}>
                            <IconDownload style={{ height: "60%" }} stroke={2}/>
                        </ActionIcon>
                    </Flex>
                </Flex>
            </Card>
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
