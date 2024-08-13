import {Link, useParams, useNavigate} from "react-router-dom";
import {Header} from "@/components/header";
import {AuthGuard} from "@/components/auth-guard";
import {Center, Container, Flex, Loader} from "@mantine/core";
import styles from './admin-panel.module.css'
import {useEffect, useState} from "react";
import {IHackathon} from "@/models/IHackathon";
import fetchHackathon from "@/api/fetch-hackathon";
import {HackathonStats} from "@/components/hackathon-stats";
import useUserStore from "@/stores/user-store";
import {route404} from "@/utils/constants";

const hackathonStatus: "not-started" | "active" | "finished"  = "active" // TODO

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
                        navigate(route404)
                    }
                })
            }
            else navigate(route404)
        } catch {
            navigate(route404)
        }
    }, []);
    if(!hackathon) return <Center w={"100vw"} h={"calc(100vh-65px)"}>
        <Loader size={"md"} />
    </Center>

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
