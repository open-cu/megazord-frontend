import {MemberCard} from "@/components/member-card";
import {Button, SimpleGrid} from "@mantine/core";
import {TeamInvitePopup} from "@/components/team-invite-popup";
import {useDisclosure} from "@mantine/hooks";
import {IUser} from "@/models/IUser";
import useUser from "@/hooks/use-user";
import {useNavigate} from "react-router-dom";
import {HackathonStatus, IHackathon} from "@/models/IHackathon";

export const TeamDetailParticipants = ({ team_id, members, creator, hackathon_id, hackathon }: { team_id: string, members: IUser[], creator: number, hackathon_id: string, hackathon: IHackathon }) => {
    const [opened, {close, open}] = useDisclosure(false)
    const { user } = useUser()
    const navigate = useNavigate()
    return (
        <>
            <SimpleGrid cols={ {base: 1, xs: 2, md: 3} } spacing="md" mt={ 12 } mb={ 36 }>
                { members.map((member: IUser) => {
                    return <MemberCard team_id={team_id} creator={creator}
                                       key={member.id} name={member.name} 
                                       email={member.email}
                                       onClick={() => navigate(`/hackathon/${hackathon_id}/resume/${member?.id}`)} />
                }) }
                {
                    user && user.id == creator && hackathon.status != HackathonStatus.Ended
                        ? <Button variant='outline' color={"var(--mantine-color-anchor)"} h="100%" mih='50px' onClick={ open }>Добавить</Button>
                        : <div/>
                }
            </SimpleGrid>

            {/* Invite popup  */ }
            <TeamInvitePopup
                team_id={team_id}
                opened={ opened }
                close={ close }
                onClose={ close }
            />
        </>

    )
}