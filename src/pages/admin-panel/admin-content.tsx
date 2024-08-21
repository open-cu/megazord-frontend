import React, {useEffect, useState} from 'react';
import { HackathonStatus, IHackathon } from '@/models/IHackathon';
import { Button, Center, Container, Flex, Loader, Text } from '@mantine/core';
import { HackathonStats } from '@/components/hackathon-stats';
import { useNavigate } from 'react-router-dom';
import { startHackathon } from '@/api/start-hackathon';
import { useDisclosure } from '@mantine/hooks';
import { endHackathon } from '@/api/end-hackathon';
import { useFetchHackathon } from '@/hooks/use-fetch-hackathon';
import {invite_link} from "@/utils/constants";
import {toast} from "@/utils/toasts";
import {IconCopy} from "@tabler/icons-react";

const handleCopyLink = (hackathon_id: string) => {
    const link = invite_link + `join-hackathon?hackathon_id=${hackathon_id}`;
    navigator.clipboard.writeText(link).then(() => {
        toast({
            type: "success",
            message: "Успешно скопировано!"
        })
    }).catch((error) => {
        console.error("Ошибка при копировании ссылки: ", error);
    });
};

const NotStartedComponent = (
    { hackathon, setHackathon }:
        { hackathon: IHackathon, setHackathon: (value: (((prevState: (IHackathon | null)) => (IHackathon | null)) | IHackathon | null)) => void }
) => {
    const navigate = useNavigate();
    const [startLoading, { toggle: toggleStart }] = useDisclosure();
    const [error, setError] = useState<string>("")


    const startHackathonFunc = async () => {
        toggleStart();
        const startToast = toast({
            loading: true,
            message: "Подготавливаемся, чтобы начать хакатон..."
        })
        try {
            startHackathon(hackathon.id)
                .then(() => {
                    setHackathon(prev => prev ? { ...prev, status: HackathonStatus.Started } : null)
                    toast({
                        id: startToast,
                        type: "success",
                        message: `Вы успешно начали хакатон "${hackathon.name}", приглашения отправлены!`
                    })
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
                    Приглашенные участники
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
                    toast({
                        type: "success",
                        message: "Хакатон закончен, формирование команд завершено!"
                    })
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
            <Flex direction={"column"} align={"center"} mt="md" gap={"xs"}>
                <Button
                    size={"sm"}
                    variant={"subtle"}
                    fw={"600"}
                    rightSection={<IconCopy stroke={ 3 } size={ 18 } />}
                    onClick={() => handleCopyLink(hackathon.id)}
                >
                    Ссылка приглашение
                </Button>
                <Button
                    color="red"
                    onClick={endHackathonFunc}
                    loading={endLoading}
                >
                    Закончить формирование команд
                </Button>
            </Flex>
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

export const AdminContent = ({ hackathon_id }: { hackathon_id: string }) => {
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
