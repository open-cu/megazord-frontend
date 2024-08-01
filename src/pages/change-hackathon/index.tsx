import {Header} from "@/components/header";
import {Container, Space} from "@mantine/core";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ChangeHackathonForm} from "@/components/change-hackathon-form";
import {IHackathon} from "@/models/IHackathon";
import fetchHackathon from "@/api/fetch-hackathon";
import {Center, Loader} from "@mantine/core";

export const ChangeHackathon = () => {
    const params = useParams();
    const [hackathon, setHackathon] = useState<IHackathon | null>(null)
    const navigate = useNavigate()
    
    const updateHackathonFunc = () => {
        try {
            if(parseInt(params.hackathon_id ?? '')) {
                const id = parseInt(params.hackathon_id ?? '')
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
        <>
            <Header variant="organizer" />
            <Container size="md" pb={"100px"}>
                <h1>Изменение хакатона</h1>
                <Space h="md" />
                <ChangeHackathonForm hackathon={hackathon} updateHackathonFunc={updateHackathonFunc} />
            </Container>
        </>
    )
}