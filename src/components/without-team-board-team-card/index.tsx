import {FC} from "react";
import {ICreatedTeam} from "@/api/get-created-teams";
import {Card, Flex, Text} from "@mantine/core";

export const WithoutTeamBoardTeamCard: FC = ({team}: {team: ICreatedTeam}) => {
    return (
        <Card withBorder>
            <Text fw={600} size={"md"}>{ team.name }</Text>

                { team.resumes.map(resume => {
                return <Flex>
                    <Text c={"blue"} size={"sm"}>{resume.user.username + ' '} - {' ' + resume.role}</Text>
                </Flex>
            }) }
        </Card>
    )
}