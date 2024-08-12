import {Link, useParams, useNavigate} from "react-router-dom";
import {Header} from "@/components/header";
import {AuthGuard} from "@/components/auth-guard";
import {Container, Flex} from "@mantine/core";
import styles from './admin-panel.module.css'
import {useEffect, useState} from "react";
import {IHackathon} from "@/models/IHackathon";
import fetchHackathon from "@/api/fetch-hackathon";
import {HackathonStats} from "@/components/hackathon-stats";
import {IHackathonStats} from "@/models/IHackathonStats";
import useUserStore from "@/stores/user-store";

const hackathonStatus = "active" // TODO
const hackathonStats: IHackathonStats = {
    teamsFullness: [1, 2, 3, 1, 2, 3, 4, 1, 2, 5, 3, 2, 1],
    usersAmount: 5,
    usersWithoutTeam: [
        {
            id: 1,
            name: "Vadim",
            email: "mail@mail.ru",
            role: "user",
            age: 15,
            city: "Абакан",
            workExp: null,
        }
    ],
    invitationAmount: 600,
    notAccessedInvitation: ["someMail@mail.ru", "someMail@mail.ru", "someMail@mail.ru", "someMail@mail.ru", "someMail@mail.ru"]
}

const AdminPanel = () => {
    const { hackathon_id } = useParams()
    const [hackathon, setHackathon] = useState<IHackathon | null>();
    const { user } = useUserStore()
    const navigate = useNavigate()
    useEffect(() => {
        try {
            const id = parseInt(hackathon_id ?? '')
            if(id) {
                fetchHackathon(id).then((hackathon) => {
                    if (hackathon) {
                        setHackathon(hackathon)
                    } else {
                        navigate('/404')
                    }
                })
            }
            else navigate('/404')
        } catch {
            navigate('/404')
        }
    }, []);

    return (
        <AuthGuard role={"organizer"}>
            <Header variant={"organizer"} />
            <Container size="md">

                <Flex justify={"space-between"} wrap={"wrap"} align={"center"}>
                    <h1>{hackathon?.name}</h1>
                    <Link
                        to={ `/change-hackathon/${ hackathon_id }` }
                        className={ styles.link }
                    >
                        Вернуться к изменению
                    </Link>
                </Flex>
                <HackathonStats hackathon={hackathon} />
            </Container>
        </AuthGuard>
    );
};

export default AdminPanel;
