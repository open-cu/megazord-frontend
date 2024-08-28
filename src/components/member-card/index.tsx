import { FC, memo } from "react";
import classes from "./member-card.module.css";
import { Avatar, Text, ActionIcon } from "@mantine/core";
import useUser from "@/hooks/use-user";
import { IconTrash } from "@tabler/icons-react";
import deleteParticipant from "@/api/delete-participant";
import {toast} from "@/utils/toasts";

export type MemberCardProps = {
    name: string;
    email: string;
    creator?: number;
    team_id?: number;
    onClick?: () => void;
}

export const MemberCard: FC<MemberCardProps> = memo(props => {

    const {user} = useUser()

    return <div className={ classes["border-container"] } onClick={ props.onClick }>
        <div className={ classes["member-container"] }>
            <Avatar/>
            <div className={ classes["member-info"] }>
                <Text truncate={"end"}>{ props.name }</Text>
                <Text truncate={"end"}>{ props.email }</Text>
            </div>
        </div>
        {user && (props.email !== user.email) && props.creator && props.team_id && props.creator === user.id && (
            <ActionIcon onClick={(e) => {
                e.stopPropagation()
                const deleteParticipantToast = toast({
                    loading: true,
                    message: "Исключаем участника"
                })
                deleteParticipant(props.team_id as string, props.email).then(()=>{
                    toast({
                        id: deleteParticipantToast,
                        type: "success",
                        message: "Успешно исключили участника"
                    })
                    window.location.reload()
                }).catch(() => toast({
                    id: deleteParticipantToast,
                    type: "error",
                    message: "Не удалось исключить участника"
                }))
            }} variant="transparent">
                <IconTrash color='red' />
            </ActionIcon>)}
        </div>
    
})