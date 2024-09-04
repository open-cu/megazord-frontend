import {FC, memo} from 'react';
import {Text, Flex, Card, Button} from '@mantine/core'
import {useNavigate} from "react-router-dom";

type HackathonStatsCardProps = {
    title: string,
    stat: number,
    link?: string,
    linkTitle?: string,
}

export const HackathonStatsCard: FC<HackathonStatsCardProps> = memo(({ title, stat, link, linkTitle }: HackathonStatsCardProps) => {
    const navigate = useNavigate()
    return (
        <Card padding="md" radius="sm" withBorder>
            <Flex
                gap="sm"
                justify="center"
                align="center"
                direction="column"
            >
                <Text size={"md"} fw={500}>{ title }</Text>
                <Text size={"2rem"} c={"var(--mantine-primary-color-filled)"} fw={600}>{stat}</Text>
                {linkTitle && link ?
                    <Button
                        size={"xs"}
                        variant={"light"}
                        onClick={() => navigate(link)}
                    >{linkTitle}</Button> :
                    <></>
                }
            </Flex>
        </Card>
    );
});
