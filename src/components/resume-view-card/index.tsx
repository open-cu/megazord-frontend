import {FC} from "react";
import {Flex, Text} from "@mantine/core";

type ResumeViewCardPayload = {
    title: string,
    content?: string | React.ReactNode,
}

export const ResumeViewCard: FC = (payload: ResumeViewCardPayload) => {
    return (
        <Flex mt="lg" direction={"column"} gap={"2"}>
            <Text size={"xl"} fw={"600"} truncate>{ payload.title }</Text>
            <Text size={"md"}>{ payload.content }</Text>
        </Flex>
    )
}