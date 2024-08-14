import { IHackathon } from '@/models/IHackathon';
import { Button, Container, Flex, Text, Center } from '@mantine/core';
import { HackathonStats } from '@/components/hackathon-stats';
import { useNavigate } from 'react-router-dom';
import {startHackathon} from "@/api/start-hackathon";
import {useDisclosure} from "@mantine/hooks";
import {endHackathon} from "@/api/end-hackathon";

const NotStartedComponent = ({ hackathon }: { hackathon: IHackathon }) => {
    const navigate = useNavigate();
    const [startLoading, { toggle: toggleStart }] = useDisclosure();
    const startHackathonFunc = () => {
        toggleStart()
        startHackathon(hackathon.id).then(() => window.location.reload())
        toggleStart()
    }

    return (
        <Container size="md" mt="xl">
            <Flex direction="column" justify="center" gap="sm" align="center">
                <Text size="xl" fw={500}>Вы еще не начали хакатон!</Text>
                <Button
                    onClick={startHackathonFunc}
                    loading={startLoading}
                >Отправить приглашения и начать хакатон</Button>
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

const StartedComponent = ({ hackathon }: { hackathon: IHackathon }) => {
    const [endLoading, { toggle: toggleEnd }] = useDisclosure();
    const endHackathonFunc = () => {
        toggleEnd()
        endHackathon(hackathon.id).then(() => window.location.reload())
        toggleEnd()
    }
    return (
        <Container size="md">
            <HackathonStats hackathon={hackathon}/>
            <Button
                color={"red"}
                mt={"md"}
                onClick={() => endHackathonFunc()}
                loading={endLoading}
            >
                Закончить формирование команд
            </Button>
        </Container>
    )
}

const EndedComponent = ({ hackathon }: { hackathon: IHackathon }) => {
    const [endLoading, { toggle: toggleEnd }] = useDisclosure();
    const endHackathonFunc = () => {
        toggleEnd()
        endHackathon(hackathon.id).then(() => window.location.reload())
        toggleEnd()
    }
    return (
        <Container size="md">
            <Center mt={"md"}>
                <Text size="xl" fw={500}>Формирование команд завершилось!</Text>
            </Center>
            <HackathonStats hackathon={hackathon}/>
        </Container>
    )
}

export const AdminContent = ({ hackathon }: { hackathon: IHackathon }) => {
    switch (hackathon.status) {
        case 'NOT_STARTED':
            return <NotStartedComponent hackathon={hackathon} />;
        case 'STARTED':
            return <StartedComponent hackathon={hackathon} />;
        case 'ENDED':
            return <EndedComponent hackathon={hackathon} />;
        default:
            return <h2>Произошла какая-то ошибка</h2>;
    }
};
