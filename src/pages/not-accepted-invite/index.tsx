import {useParams} from "react-router-dom"
import {AuthGuard} from "@/components/auth-guard";
import {Header} from "@/components/header";
import {Button, Container, Flex, SegmentedControl, Text} from "@mantine/core";
import {useEffect, useState} from "react";
import getNotAcceptedInvite, {NotAcceptedInviteUnit} from "@/api/get-not-accepted-invite";
import {useFetchHackathon} from "@/hooks/use-fetch-hackathon";
import {HackathonStatus} from "@/models/IHackathon";
import {sendEmailInvitesFunc} from "@/utils/sendInvites";
import {NotAcceptedInviteUnitCard} from "@/components/not-accepted-invite-unit-card";

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
            <Flex justify={"space-between"} align={"center"} direction={{ xs: "row", base: "column" }}>
                <Text fz={{ xs: "xl", base: "md" }} fw={"600"} ta={{ xs: "left", base: "center" }}>Участники не принявшие приглашение в хакатон</Text>
                {
                    (hackathon && hackathon?.status != HackathonStatus.Ended && filteredParticipants.length) ?
                        <Button size={"xs"} disabled={filteredParticipants.length == 0} onClick={() =>
                            sendEmailInvitesFunc(
                                filteredParticipants.map(participant => participant.email),
                                hackathon_id
                            )}>Пригласить повторно</Button> :
                        <></>
                }
            </Flex>
            <SegmentedControl
                my={"xs"}
                size={"sm"}
                value={status}
                onChange={setStatus}
                data={[
                    { label: 'Все', value: 'default' },
                    { label: 'Ошибка email', value: 'email_error' },
                    { label: 'Ошибка telegram', value: 'tg_error' },
                ]}
            />
            <Flex direction={"column"} gap={"md"}>
                { filteredParticipants.length ? filteredParticipants.map((unit: NotAcceptedInviteUnit) => {
                    return <NotAcceptedInviteUnitCard key={unit.email} hackathon={hackathon} unit={unit} />
                }) : (status == "default" ?
                    <Text size={"md"}>Все приглашенные участники зарегестрировались</Text> :
                        <Text size={"md"}>Ничего не найдено</Text>
                ) }
            </Flex>
        </Container>
    </AuthGuard>
}