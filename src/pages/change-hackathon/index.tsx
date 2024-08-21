import {Header} from "@/components/header";
import {Container, Space} from "@mantine/core";
import {Link, useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {ChangeHackathonForm} from "@/components/change-hackathon-form";
import {IHackathon} from "@/models/IHackathon";
import fetchHackathon from "@/api/fetch-hackathon";
import {Center, Loader, Flex} from "@mantine/core";
import styles from './change-hackathon.module.css'
import {AuthGuard} from "@/components/auth-guard";
import {route404} from "@/utils/constants";

export const ChangeHackathon = () => {
    const params = useParams();
    const [hackathon, setHackathon] = useState<IHackathon | null>(null)
    const navigate = useNavigate()

    const updateHackathonFunc = () => {
        try {
            const id = params.hackathon_id ?? ''
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
    }
    
    useEffect(() => {
        updateHackathonFunc()
    }, [])

    if (!hackathon) {
        return <Center w='100vw' h='100vh'>
            <Loader size="md"/>
        </Center>
    }

    return (
        <AuthGuard role={"organizer"}>
            <Header variant="organizer" />
            <Container size="md" pb={"100px"}>
                <Flex justify={"space-between"} align={"center"}>
                    <h1>Изменение хакатона</h1>
                    <Link className={styles.link} to={`/admin-panel/${hackathon.id}`}>
                        Перейти в админ панель
                    </Link>
                </Flex>
                <Space h="md" />
                <ChangeHackathonForm hackathon={hackathon} updateHackathonFunc={updateHackathonFunc} />
            </Container>
        </AuthGuard>
    )
}