import { Header } from "@/components/header";
import { Avatar, Container, Flex, SimpleGrid, Space, Text } from "@mantine/core";
import { SearchInput } from "@/components/search-input";
import { IconPlus } from "@tabler/icons-react";
import { AuthGuard } from "@/components/auth-guard";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ITeam } from "@/models/ITeam";
import { IHackathon } from "@/models/IHackathon";
import fetchHackathon from "@/api/fetch-hackathon";
import fetchTeams from "@/api/fetch-teams";
import classes from "./teams-org.module.css";

export const TeamsOrg = () => {
    const navigate = useNavigate()
    const { hackathon_id } = useParams()
    const [teams, setTeams] = useState<ITeam[]>([])
    const [filteredTeams, setFilteredTeams] = useState<ITeam[]>([])
    const [hackathon, setHackathon] = useState<IHackathon | null>(null);

    useEffect(() => {
        fetchTeams(parseInt(hackathon_id as string)).then(data => {
            if (!data) return null;
            setTeams(data)
            setFilteredTeams(data)
            console.log(data);
        });

        fetchHackathon(parseInt(hackathon_id as string)).then(data => {
            if (!data) return null;
            setHackathon(data);
            console.log(data);
            
        })
    }, [])

    const items = filteredTeams.map((team, index) => {

        const maxMembersAmount = hackathon?.max_participants;
        const membersAmount = team.members.length;

        const avatarsItems = Array(maxMembersAmount).fill(0).map((_, index) => (
            (index < membersAmount) ? (
                <Avatar size="md" />
            ) : (
                <Avatar size="md" color="blue">
                    <IconPlus color="#34b1c5" width={15} />
                </Avatar>
            )
        ))
    
        return (
            <div 
                key={index}
                className={classes["border-container"]}
                onClick={() => navigate(`/hackathon/${hackathon_id}/teams/${team.id}`)}>
                <Flex gap="xs" wrap='wrap'>
                    {avatarsItems}
                </Flex>
                <Text>{team.name}</Text>
            </div>
        )}
    )

    const filterItems = (search: string) => {
        setFilteredTeams(teams.filter(team => team.name.includes(search)))
    }

  return (
    <AuthGuard role="organizer">
       <Header variant="organizer" />
       <Container>
            <h1>Команды</h1>
            <Space h="md" />
            <SearchInput placeholder="Поиск команд" onChange={search => filterItems(search)} />
            <Space h="md" />
            <SimpleGrid cols={{ base: 1, xs: 2, sm: 3 }} >
                {items}
            </SimpleGrid>
       </Container>
    </AuthGuard>
  );
};
