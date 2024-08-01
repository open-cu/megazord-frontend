import {FC, memo, useEffect, useState} from "react";
import styles from './vacancy-card.module.css';
import { Text } from "@mantine/core";
import applyForJob from "@/api/apply-for-job";
import {IVacancyResponse} from "@/models/IVacancyResponse";
import useUser from "@/hooks/use-user";
import {ITeam} from "@/models/ITeam";

export type VacancyCardProps = {
    id: number
    name: string
    myTeam: ITeam | null
    vacancy_responses: IVacancyResponse[]
    keywords: string[]
    onClick?: () => void
}

export const VacancyCard: FC<VacancyCardProps> = memo(props => {
    const [canSendResume, setCanSendResume] = useState<'canSend' | 'cantSend' | 'sended'>('cantSend')
    const { user } = useUser()
    
    useEffect(() => {
        let state = 'cantSend' as 'canSend' | 'cantSend' | 'sended'
        props.vacancy_responses.forEach(response => {
            if((user && response.candidate_id == user.id && response.vacancy_id == props.id))
                state = 'sended'
            if(user && user.role && user.role == "user" && !props.myTeam && (state != 'sended'))
                state = 'canSend'
        })
        if (props.vacancy_responses.length === 0 && user?.role === 'user' && !props.myTeam) {
            state = 'canSend'
        }
        setCanSendResume(state)
    }, [user, props.vacancy_responses, props.myTeam])
    
    return <div className={ styles.card } onClick={ props.onClick }>
        <Text fs='16px' fw={ 500 }>{ props.name }</Text>
        <Text fs='16px'>{ props.keywords.join(', ') }</Text>
        {
            canSendResume == 'canSend' ?
                <Text
                    fs='16px' c='blue'
                    onClick={() => {
                        applyForJob(props.id).then(() => window.location.reload())
                    }}
                >Отправить свое резюме</Text> :
                canSendResume == 'sended' ?
                    <Text fs='16px' c='blue'>Вы уже отправили своё резюме</Text> :
                    <></>
        }
    </div>
})