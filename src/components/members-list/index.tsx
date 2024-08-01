import { SimpleGrid } from "@mantine/core";
import { MemberCard } from "@/components/member-card";
import { IUser } from "@/models/IUser";
import { useNavigate } from "react-router-dom";

interface Props {
  hackathon_id: number;
  members: IUser[];
}

export const MembersList = ({ hackathon_id, members}: Props) => {

    const navigate = useNavigate()

    const items = members.map((member, index) => (
        <MemberCard key={index} { ...member } onClick={() => navigate(`/hackathon/${hackathon_id}/resume/${member.id}`) } />
    ))

    return (
        <SimpleGrid cols={ {base: 1, xs: 2, sm: 3} } spacing="md">
            { items }
        </SimpleGrid>
    );
};
