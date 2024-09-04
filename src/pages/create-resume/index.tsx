import { Button, Center, Flex, Text } from "@mantine/core";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from './create-resume.module.css'
import { AuthGuard } from "@/components/auth-guard";
import { IHackathon } from "@/models/IHackathon";
import fetchHackathonById from "@/api/fetch-hackathon";
import createCustomResume from "@/api/create-custom-resume";
import {toast} from "@/utils/toasts";

export const CreateResume = () => {
    const params = useParams()
    const [hackathon, setHackathon] = useState<IHackathon | null>()
    const [customResumeLoading, setCustomResumeLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const id = params.hackathon_id ?? ''

        if (id != "") {
            fetchHackathonById(id).then(setHackathon)
        } else {
            navigate('/')
        }
    }, [])


    const onCreateCustomResume = async () => {
        if (hackathon && !customResumeLoading) {
            setCustomResumeLoading(true)

            const status = await createCustomResume(hackathon.id)
            if (status === 201) {
                navigate(`/hackathon/${hackathon.id}/my-resume`)
                toast({
                    type: "success",
                    message: "Резюме успешно создано!"
                })
            } else if (status === 409) {
                navigate(`/hackathon/${hackathon.id}/my-resume`)
                toast({
                    type: "error",
                    message: "У вас уже есть резюме"
                })
            } else toast({
                type: "error",
                message: "Произошла какая-то ошибка"
            })
            setCustomResumeLoading(false)
        }
    }

    if (!hackathon) {
        return <AuthGuard role='user'/>
    }

    return (
        <AuthGuard role='user'>
            <Flex component={ Center } h={ "100vh" } direction={ "column" }>
                <Text size={ "xl" } mb="md" className={ styles.title }>
                    Создание резюме
                    <br/>
                    для «{ hackathon.name }»
                </Text>
                <Flex direction={ "column" } gap={ "sm" }>
                    <Button loading={ customResumeLoading } onClick={ onCreateCustomResume }>
                        Создать с нуля
                    </Button>
                    <Button component={Link} c={'var(--mantine-color-white)'} to={`/hackathon/${ hackathon.id }/create-resume/github`}>
                        Импорт из Github
                    </Button>
                    <Button component={Link} c={'var(--mantine-color-white)'} to={ `/hackathon/${ hackathon.id }/create-resume/pdf` }>
                        Импорт из резюме pdf
                    </Button>
                    <Button component={Link} c={'var(--mantine-color-white)'} to={ `/hackathon/${ hackathon.id }/create-resume/hh` }>
                        Импорт из hh.ru
                    </Button>
                    {/*<Button>*/}
                    {/*    <Link to={ `/hackathon/${ hackathon.id }/create-resume/pdf` }>*/}
                    {/*        Импорт из резюме pdf*/}
                    {/*    </Link>*/}
                    {/*</Button>*/}
                    {/*<Button>*/}
                    {/*    <Link to={ `/hackathon/${ hackathon.id }/create-resume/hh` }>*/}
                    {/*        Импорт из hh.ru*/}
                    {/*    </Link>*/}
                    {/*</Button>*/}
                </Flex>
            </Flex>
        </AuthGuard>
    )
}