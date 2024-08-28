import {toast} from "@/utils/toasts";
import sendHackathonInvites from "@/api/send-hackathon-invites";

export const sendEmailInvitesFunc = (email: string | string[], hackathon_id: string) => {
    if(typeof email == "string") {
        const sendEmailToast = toast({
            loading: true,
            title: "Отправка приглашения",
            message: `Отправляем приглашение на почту ${email}`
        })
        sendHackathonInvites(hackathon_id, [email]).then(res => {
            if(res) toast({
                id: sendEmailToast,
                type: "success",
                message: "Приглашение успешно отправлено!"
            })
            else toast({
                id: sendEmailToast,
                type: "error",
                message: "Произошла ошибка при отправке приглашения"
            })
        })
    } else {
        const sendEmailToast = toast({
            loading: true,
            title: "Отправка приглашений",
            message: `Отправляем приглашения...`
        })
        sendHackathonInvites(hackathon_id, email).then(res => {
            if(res) toast({
                id: sendEmailToast,
                type: "success",
                message: "Приглашения успешно отправлены!"
            })
            else toast({
                id: sendEmailToast,
                type: "error",
                message: "Произошла ошибка при отправке приглашений"
            })
        })
    }

}