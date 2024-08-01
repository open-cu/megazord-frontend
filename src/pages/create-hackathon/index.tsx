import {Header} from "@/components/header";
import {Container, Space} from "@mantine/core";
import { AuthGuard } from "@/components/auth-guard";
import {CreateHackathonForm} from "@/components/create-hackathon-form";

export const CreateHackathon = () => {
    return (
        <AuthGuard role='organizer'>
            <Header variant="organizer" />
            <Container size="md" pb={"100px"}>
                <h1>Создание хакатона</h1>
                <Space h="md" />
                <CreateHackathonForm />
            </Container>
        </AuthGuard>
    )
}