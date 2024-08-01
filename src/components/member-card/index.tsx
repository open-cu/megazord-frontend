import { FC, memo } from "react";
import classes from "./member-card.module.css";
import { Avatar, Text, ActionIcon } from "@mantine/core";
import useUser from "@/hooks/use-user";
import { IconTrash } from "@tabler/icons-react";
import deleteParticipant from "@/api/delete-participant";

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
                <Text>{ props.name }</Text>
                <Text>{ props.email }</Text>
            </div>
        </div>
        {user && (props.email !== user.email) && props.creator && props.team_id && props.creator === user.id && (
            <ActionIcon onClick={(e) => {
                e.stopPropagation()
                deleteParticipant(props.team_id as number, props.email).then(()=>{
                    window.location.reload()
                })
            }} variant="transparent">
                <IconTrash color="pink" />
            </ActionIcon>)}
        </div>
    
})