import { VacancyCard } from "@/components/vacancy-card";
import { SimpleGrid } from "@mantine/core";
import { ITeamVacancy } from "@/models/ITeamVacancy";
import { ITeam } from "@/models/ITeam";
import { useNavigate, useParams } from "react-router-dom";
import {IVacancyResponse} from "@/models/IVacancyResponse";

export const TeamDetailVacancies = ({vacancy_responses, listVacancies, myTeam, currentTeam}: {
    vacancy_responses: IVacancyResponse[],
    listVacancies: ITeamVacancy[],
    myTeam: ITeam | null,
    currentTeam: ITeam,
}) => {
    const { hackathon_id, team_id } = useParams()
    const navigate = useNavigate()
    return (
        <SimpleGrid cols={ {base: 1, xs: 2, sm: 3} } spacing="md" mt={ 12 } mb={ 36 }>
            { listVacancies?.map((vacancy: ITeamVacancy) => {

                const onClick = () => {
                    if (myTeam?.id == currentTeam.id) {
                        navigate(`/hackathon/${hackathon_id}/teams/${team_id}/vacancy/${vacancy.id}/candidates`)
                    }
                }
                
                return <VacancyCard
                    onClick={ onClick}
                    key={ vacancy.id }
                    id={ vacancy.id }
                    vacancy_responses={vacancy_responses}
                    myTeam={myTeam}
                    keywords={ vacancy.keywords }
                    name={ vacancy.name }
                />
            }) }
        </SimpleGrid>
    )
}