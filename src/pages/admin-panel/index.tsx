import {Link, useParams, useNavigate} from "react-router-dom";
import {Header} from "@/components/header";
import {AuthGuard} from "@/components/auth-guard";
import {Center, Container, Flex, Loader, Button, Text} from "@mantine/core";
import styles from './admin-panel.module.css'
import {useEffect, useState} from "react";
import {IHackathon} from "@/models/IHackathon";
import fetchHackathon from "@/api/fetch-hackathon";
import useUserStore from "@/stores/user-store";
import {route404} from "@/utils/constants";
import {AdminContent} from "@/pages/admin-panel/admin-content";

const AdminPanel = () => {
    const { hackathon_id } = useParams()
    const [hackathon, setHackathon] = useState<IHackathon | null>();
    const { user } = useUserStore()
    const navigate = useNavigate()
    useEffect(() => {
        try {
            const id = hackathon_id ?? ''
            if(id) {
                fetchHackathon(id).then((data) => {
                    if (data) {
                        setHackathon(data)
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
                    <Text fz={32} truncate={"end"}>{hackathon?.name}</Text>
                    <Link
                        to={ `/change-hackathon/${ hackathon_id }` }
                        className={ styles.link }
                    >
                        Вернуться к изменению
                    </Link>
                </Flex>
                <AdminContent hackathon_id={hackathon.id}  />
            </Container>
        </AuthGuard>
    );
};

export default AdminPanel;
