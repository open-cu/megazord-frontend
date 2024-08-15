import React, {useEffect, useState} from 'react';
import { HackathonStatus, IHackathon } from '@/models/IHackathon';
import { Button, Center, Container, Flex, Loader, Text } from '@mantine/core';
import { HackathonStats } from '@/components/hackathon-stats';
import { useNavigate } from 'react-router-dom';
import { startHackathon } from '@/api/start-hackathon';
import { useDisclosure } from '@mantine/hooks';
import { endHackathon } from '@/api/end-hackathon';
import { useFetchHackathon } from '@/hooks/use-fetch-hackathon';

const NotStartedComponent = (
    { hackathon, setHackathon }:
        { hackathon: IHackathon, setHackathon: (value: (((prevState: (IHackathon | null)) => (IHackathon | null)) | IHackathon | null)) => void }
) => {
    const navigate = useNavigate();
    const [startLoading, { toggle: toggleStart }] = useDisclosure();
    const [error, setError] = useState<string>("")
    const startHackathonFunc = async () => {
        toggleStart();
        try {
            startHackathon(hackathon.id)
                .then(() => {
                    setHackathon(prev => prev ? { ...prev, status: HackathonStatus.Started } : null)
                })
        } catch (error) {
            setError('Произошла ошибка при попытке начать хакатон');
        } finally {
            toggleStart();
        }
    };

    if (!hackathon) return <Loader size="md" />;

    return (
        <Container size="md" mt="xl">
            <Flex direction="column" justify="center" gap="sm" align="center">
                <Text size="xl" fw={500}>Вы еще не начали хакатон!</Text>
                <Button
                    onClick={startHackathonFunc}
                    loading={startLoading}
                >
                    Отправить приглашения и начать хакатон
                </Button>
                <Text c={"red"} size={"xs"}>{error}</Text>
                <Button
                    size="xs"
                    variant="light"
                    onClick={() => navigate(`/admin-panel/${hackathon.id}/invited-users`)}
                >
                    Почты приглашенных участников
                </Button>
            </Flex>
        </Container>
    );
};

const StartedComponent = (
    { hackathon, setHackathon }:
        { hackathon: IHackathon, setHackathon: (value: (((prevState: (IHackathon | null)) => (IHackathon | null)) | IHackathon | null)) => void }
) => {
    const [endLoading, { toggle: toggleEnd }] = useDisclosure();
    const [error, setError] = useState<string>("")

    const endHackathonFunc = async () => {
        toggleEnd();
        try {
            endHackathon(hackathon.id)
                .then(() => {
                    setHackathon(prev => prev ? {...prev, status: HackathonStatus.Ended} : null)
                })
        } catch (error) {
            setError('Произошла ошибка при попытке закончить формирование команд')
        } finally {
            toggleEnd();
        }
    };

    if (!hackathon) return <Loader size="md" />;

    return (
        <Container size="md">
            <HackathonStats hackathon={hackathon} />
            <Button
                color="red"
                mt="md"
                onClick={endHackathonFunc}
                loading={endLoading}
            >
                Закончить формирование команд
            </Button>
            <Text c={"red"} size={"xs"}>{error}</Text>
        </Container>
    );
};

const EndedComponent = ({ hackathon }: { hackathon: IHackathon }) => {
    if (!hackathon) return <Loader size="md" />;

    return (
        <Container size="md">
            <Center mt="md">
                <Text size="xl" fw={500}>Формирование команд завершилось!</Text>
            </Center>
            <HackathonStats hackathon={hackathon} />
        </Container>
    );
};

export const AdminContent = ({ hackathon_id }: { hackathon_id: number }) => {
    const [hackathon, setHackathon] = useFetchHackathon(hackathon_id);
    useEffect(() => {
        if (hackathon) {
            console.log('Hackathon status:', hackathon.status);
        }
    }, [hackathon]);
    if (!hackathon) return (
        <Center w="100vw" h="calc(100vh-65px)">
            <Loader size="md" />
        </Center>
    );

    switch (hackathon.status) {
        case HackathonStatus.NotStarted:
            return <NotStartedComponent hackathon={hackathon} setHackathon={setHackathon} />;
        case HackathonStatus.Started:
            return <StartedComponent hackathon={hackathon} setHackathon={setHackathon}/>;
        case HackathonStatus.Ended:
            return <EndedComponent hackathon={hackathon} />;
        default:
            return <h2>Произошла какая-то ошибка</h2>;
    }
};
