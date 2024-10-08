import { Card, SimpleGrid, Image, Group, Text } from "@mantine/core";
import classes from "./hackathons-list.module.css"
import { IHackathon } from "@/models/IHackathon.ts";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { UserRole } from "@/models/IUser.ts";

type HackathonsListProps = {
    role: UserRole;
    hackathons: IHackathon[]
}

export const HackathonsList: FC<HackathonsListProps> = (props) => {
    const navigate = useNavigate()

    const items = props.hackathons.map(hackathon => {
        const imageSrc = `data:image/png;base64,${hackathon.imageCover}`
        return (
            <Card
                onClick={() => {
                    if (props.role == 'organizer') {
                        navigate(`/change-hackathon/${hackathon.id}`);
                    } else {
                        navigate(`/hackathon/${hackathon.id}`);
                    }
                }}
                key={hackathon.id}
                className={classes["card"]}
                role="button"
                shadow="sm"
                padding="lg"
                radius="md"
                w={"auto"}
            >
                <Card.Section>
                    <Image
                        src={imageSrc}
                        height={160}
                    />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500} truncate={"end"}>
                        {hackathon.name}
                    </Text>
                </Group>

                <Text size="sm" c="dimmed" truncate={"end"}>
                    {hackathon.description}
                </Text>
            </Card>
        );
    });

    return (
        <SimpleGrid cols={{ base: 1, xs: 2, sm: 3 }} spacing="md">
            {items}
        </SimpleGrid>
    );
};
