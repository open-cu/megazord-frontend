import { FC, memo, useState, useEffect } from "react";
import { Button, Container, Flex, SimpleGrid, Text } from "@mantine/core";
import { Header } from "@/components/header";
import { IconPlus } from "@tabler/icons-react";
import { CurrentTeamCard } from "@/components/current-team-card";
import { SearchInput } from "@/components/search-input";
import { useMediaQuery } from "@mantine/hooks";
import { AuthGuard } from "@/components/auth-guard";
import { ITeam } from "@/models/ITeam";
import { useNavigate, useParams } from "react-router-dom"
import fetchHackathon from "@/api/fetch-hackathon";
import {HackathonStatus, IHackathon} from "@/models/IHackathon";
import fetchMyTeam from "@/api/fetch-my-team";
import { IVacancySuggestion } from "@/models/IVacancySuggestion.ts";
import { fetchResume } from "@/api/fetch-resume.ts";
import getVacanciesSuggestions from "@/api/get-vacancies-suggestions.ts";
import { VacancySuggestionCard } from "@/components/vacancy-suggestion-card";

export type TeamUserPageProps = {}

export const TeamUserPage: FC<TeamUserPageProps> = memo(() => {
    const is960 = useMediaQuery('(max-width: 960px) and (min-width: 651px)')
    const is650 = useMediaQuery('(max-width: 650px)')

    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const {hackathon_id} = useParams()
    const [suggestions, setSuggestions] = useState<IVacancySuggestion[]>([])
    const [hackathon, setHackathon] = useState<IHackathon | null>(null);
    const [myTeam, setMyTeam] = useState<ITeam | null | undefined>(undefined)
    
    useEffect(() => {
        fetchResume(
            localStorage.getItem('user_id') ?? '',
            hackathon_id ?? '',
        ).then(resume => {
            if (resume) {
                getVacanciesSuggestions(resume.id).then(data => {
                    if (!data) return null;
                    setSuggestions(data)
                });
            } else {
                navigate('/')
            }
        })

        fetchHackathon(hackathon_id as string).then(data => {
            if (!data) return null;
            setHackathon(data);
        })

        fetchMyTeam(hackathon_id as string).then(data => {
            setMyTeam(data)
        })

    }, [])

    return <AuthGuard role='user'>
        <Header variant='user'/>
        <Container size="md" mt="md">
            {/*  Head */ }
            <Flex justify="space-between" mb='md' align='center'>
                <h1>Команды</h1>
                {
                    (!myTeam && hackathon?.status != HackathonStatus.Ended) ? <Button
                        onClick={ () => navigate(`/hackathon/${ hackathon_id }/teams/create`) }
                        variant="outline"
                        rightSection={ <IconPlus size={ 14 }/> }>
                        Создать команду
                    </Button> : <></>
                }
            </Flex>

            {/*  Current team */ }
            { myTeam && hackathon && <CurrentTeamCard
                hackathonId={ hackathon.id }
                id={ myTeam.id }
                name={ myTeam.name }
                members={ myTeam.members.length }
                maxMembers={ hackathon!.max_participants }
            /> }


            {/* Search input */ }
            <SearchInput
                onChange={ v => setSearch(v.toLowerCase()) }
                placeholder="Найти команду"
            />

            {/* Teams list */ }
            {suggestions.length > 0 ?
                <SimpleGrid cols={is960 ? 2 : is650 ? 1 : 3} mt='md' spacing="md" mb="xl">
                    {
                        hackathon && suggestions
                            .filter(x => x.name.toLowerCase().includes(search))
                            .map(suggestion => {
                                return <VacancySuggestionCard
                                    suggestion={suggestion}
                                    maxMembers={hackathon.max_participants}
                                    hackathonId={hackathon.id}
                                    hackathonStatus={hackathon.status}
                                />
                            })
                    }
                </SimpleGrid> :
                <Text size="lg" fw={"500"} mt={"lg"}>
                    Команд не найдено
                </Text>
            }
        </Container>
    </AuthGuard>
})
