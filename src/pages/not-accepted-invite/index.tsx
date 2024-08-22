import { useParams } from "react-router-dom"
import {AuthGuard} from "@/components/auth-guard";
import {Header} from "@/components/header";
import {Card, Container, Flex, Button, Text, SegmentedControl, Tooltip} from "@mantine/core";
import {useEffect, useState} from "react";
import getNotAcceptedInvite, {NotAcceptedInviteUnit} from "@/api/get-not-accepted-invite";
import {useFetchHackathon} from "@/hooks/use-fetch-hackathon";
import {HackathonStatus} from "@/models/IHackathon";
import {sendEmailInvitesFunc} from "@/utils/sendInvites";
import {NotAcceptedInviteUnitCard} from "@/components/NotAcceptedInviteUnitCard";

type NotAcceptedInviteUnitStatus = 'default' | 'email_error' | 'tg_error'

export const NotAcceptedInvite = () => {
    const {hackathon_id} = useParams()
    const [hackathon] = useFetchHackathon(hackathon_id)
    const [participants, setParticipants] = useState<NotAcceptedInviteUnit[]>([]);
    const [filteredParticipants, setFilteredParticipants] = useState<NotAcceptedInviteUnit[]>([]);
    const [status, setStatus] = useState<NotAcceptedInviteUnitStatus>('default');
    useEffect(() => {
        getNotAcceptedInvite(hackathon_id).then(data => {
            setParticipants(data)
            setFilteredParticipants(data)
        })
    }, []);
    useEffect(() => {
        setFilteredParticipants(participants.filter(unit => {
            if(status == 'default') return true
            if(status == 'email_error') return !unit.send_email_status
            if(status == 'tg_error') return !unit.send_tg_status
        }))
    }, [status]);


    return <AuthGuard role={"organizer"}>
        <Header variant={"organizer"}/>
        <Container size={"md"}>
            <Flex justify={"space-between"} align={"center"}>
                <h2>Участники не принявшие приглашение в хакатон</h2>
                {
                    (hackathon && hackathon?.status != HackathonStatus.Ended && filteredParticipants.length) ?
                        <Button size={"xs"} onClick={() =>
                            sendEmailInvitesFunc(
                                filteredParticipants.map(participant => participant.email),
                                hackathon_id
                            )}>Пригласить повторно</Button> :
                        <></>
                }
            </Flex>
            <SegmentedControl
                value={status}
                onChange={setStatus}
                data={[
                    { label: 'Все', value: 'default' },
                    { label: 'Ошибка при отправке email', value: 'email_error' },
                    { label: 'Ошибка при отправке telegram', value: 'tg_error' },
                ]}
            />
            <Flex direction={"column"} gap={"md"} mt={"md"}>
                { filteredParticipants.length ? filteredParticipants.map((unit: NotAcceptedInviteUnit) => {
                    return <NotAcceptedInviteUnitCard hackathon={hackathon} unit={unit} key={unit.email} />
                }) : <Text size={"md"}>Все приглашенные участники зарегестрировались</Text> }
            </Flex>
        </Container>
    </AuthGuard>
}