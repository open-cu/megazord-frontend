import {FC} from "react";
import {ICreatedTeam} from "@/api/get-created-teams";
import {Card, Flex, Text, Anchor} from "@mantine/core";
import {Link} from "react-router-dom";

export const WithoutTeamBoardTeamCard: FC = ({team}: {team: ICreatedTeam}) => {
    return (
        <Card withBorder>
            <Text fw={600} size={"md"}>{ team.name }</Text>
            <Flex direction={"column"}>
                { team.resumes.map(resume => {
                    return <Link to={ `/hackathon/${resume.hackathon_id}/resume/${resume.user.id}` }>
                        <Anchor size={ "sm" } c={"blue"}>
                            {resume.user.username + ' '} - {' ' + resume.role}
                        </Anchor>
                    </Link>
                 }) }
            </Flex>
        </Card>
    )
}