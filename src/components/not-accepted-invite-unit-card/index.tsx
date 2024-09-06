import {Button, Card, Flex, Text, Tooltip} from "@mantine/core";
import {HackathonStatus, IHackathon} from "@/models/IHackathon";
import {sendEmailInvitesFunc} from "@/utils/sendInvites";
import {IconExclamationCircle, IconMailForward} from "@tabler/icons-react";
import {NotAcceptedInviteUnit} from '@/api/get-not-accepted-invite'

const getUnitError = (unit: NotAcceptedInviteUnit) => {
    const isError = !unit.send_email_status || !unit.send_tg_status
    let errorText = "";
    if (!unit.send_email_status && !unit.send_tg_status)
        errorText = "Ошибка при отправке email и telegram";
    else if (!unit.send_email_status)
        errorText = "Ошибка при отправке email";
    else if (!unit.send_tg_status)
        errorText = "Ошибка при отправке telegram";
    return { isError, errorText }
}

export const NotAcceptedInviteUnitCard = ({ hackathon, unit }: { hackathon: IHackathon, unit: NotAcceptedInviteUnit  }) => {
    const {isError, errorText} = getUnitError(unit)
    return (
        <Card padding={"sm"} radius={"md"} withBorder key={unit.email}>
            <Flex direction={"row"} justify={"space-between"} align={"center"}>
                <Text fw={500}>{unit.email}</Text>
                <Flex align={"center"} gap={"xs"}>
                    {
                        isError ?
                            <Tooltip
                                label={errorText}
                                withArrow
                                position="bottom"
                            >
                                <IconExclamationCircle color={"red"} stroke={1} />
                            </Tooltip> : <></>
                    }
                    {
                        (hackathon && hackathon?.status != HackathonStatus.Ended) ?
                            <Button size={"xs"} variant={"light"} color={"var(--mantine-color-anchor)"} onClick={() => sendEmailInvitesFunc(unit.email, hackathon.id)}>
                                <IconMailForward stroke={1} />
                            </Button> :
                            <></>
                    }
                </Flex>
            </Flex>
        </Card>
    )
}