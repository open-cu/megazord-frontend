import { VacancyReplyCard } from "@/components/vacancy-reply-card";
import { SimpleGrid } from "@mantine/core";
import { IVacancyResponse } from "@/models/IVacancyResponse";
import { useNavigate } from "react-router-dom";
import declineApplication from "@/api/decline-application";
import acceptApplication from "@/api/accept-application";

export const TeamDetailVacanciesResponses = (
    {variant, vacancy_responses, hackathon_id, callbackOnDelete, callbackOnAccept}:
        {
            variant: "teamlead" | "user",
            vacancy_responses: IVacancyResponse[],
            hackathon_id: number,
            callbackOnDelete: (res_id: number) => void,
            callbackOnAccept: (res_id: number) => void
        }
) => {
    const navigate = useNavigate()
    return (
        <SimpleGrid cols={ {base: 1, xs: 2, sm: 3} } spacing="md" mt={ 12 } mb={ 36 }>
            { vacancy_responses.map(response => {
                console.log(response)
                return <VacancyReplyCard
                    variant={ variant }
                    vacancy_id={ response.vacancy_id }
                    candidate_id={ response.candidate_id }
                    onResumeClick={ () => {
                        navigate(`/hackathon/${ hackathon_id }/resume/${ response.candidate_id }`)
                    } }
                    onDecline={ () => {
                        declineApplication(response.id)
                        callbackOnDelete(response.id)
                    } }
                    onAccept={ () => {
                        acceptApplication(response.id).then(() => {
                            callbackOnAccept(response.id)
                        })
                    } }
                />
            }) }
        </SimpleGrid>
    )
}