import { VacancyReplyCard } from "@/components/vacancy-reply-card";
import { SimpleGrid } from "@mantine/core";
import { IVacancyResponse } from "@/models/IVacancyResponse";
import { useNavigate } from "react-router-dom";
import declineApplication from "@/api/decline-application";
import acceptApplication from "@/api/accept-application";
import {toast} from "@/utils/toasts";

export const TeamDetailVacanciesResponses = (
    {variant, vacancy_responses, hackathon_id, callbackOnDelete, callbackOnAccept}:
        {
            variant: "teamlead" | "user",
            vacancy_responses: IVacancyResponse[],
            hackathon_id: string,
            callbackOnDelete: (res_id: number) => void,
            callbackOnAccept: (res_id: number) => void
        }
) => {
    const navigate = useNavigate()
    return (
        <SimpleGrid cols={ {base: 1, xs: 2, sm: 3} } spacing="md" mt={ 12 } mb={ 36 }>
            { vacancy_responses.map(response => {
                return <VacancyReplyCard
                    variant={ variant }
                    vacancy_id={ response.vacancy_id }
                    candidate_id={ response.candidate_id }
                    onResumeClick={ () => {
                        navigate(`/hackathon/${ hackathon_id }/resume/${ response.candidate_id }`)
                    } }
                    onDecline={ () => {
                        const declineToast = toast({
                            loading: true,
                            message: "Отклонение кандидата"
                        })
                        declineApplication(response.id).then(() => {
                            toast({
                                id: declineToast,
                                type: "success",
                                message: "Вы успешно отклонили кандидата"
                            })
                            callbackOnDelete(response.id)
                            window.location.reload()
                        })
                    } }
                    onAccept={ () => {
                        const acceptToast = toast({
                            loading: true,
                            message: "Принятие кандидата"
                        })
                        acceptApplication(response.id).then(() => {
                            toast({
                                id: acceptToast,
                                type: "success",
                                message: "Вы успешно приняли кандидата"
                            })
                            callbackOnAccept(response.id)
                            window.location.reload()
                        }).catch(() => {
                            toast({
                                id: acceptToast,
                                type: "success",
                                message: "Произошла ошибка"
                            })
                        })
                    } }
                />
            }) }
        </SimpleGrid>
    )
}