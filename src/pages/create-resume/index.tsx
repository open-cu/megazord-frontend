import {Button, Center, Flex, Text} from "@mantine/core";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import styles from './create-resume.module.css'
import {AuthGuard} from "@/components/auth-guard";
import {IHackathon} from "@/models/IHackathon";
import fetchHackathonById from "@/api/fetch-hackathon";
import createCustomResume from "@/api/create-custom-resume";
import {toast} from "@/utils/toasts";
import {SwitchThemeBtn} from "@/components/switch-theme-btn";

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

    if (!hackathon) return <AuthGuard role='user'/>
    return (
        <AuthGuard role='user'>
            <Flex component={ Center } h={ "100vh" } direction={ "column" } style={{ position: "relative" }}>
                <SwitchThemeBtn style={{ position: "absolute", bottom: "5%", right: "5%" }} size={"lg"} />
                <Text size={ "xl" } mb="md" className={ styles.title }>
                    Создание резюме
                    <br/>
                    для «{ hackathon.name }»
                </Text>
                <Flex direction={ "column" } gap={ "sm" }>
                    <Button loading={ customResumeLoading } onClick={ onCreateCustomResume }>
                        Создать с нуля
                    </Button>
                    <Button onClick={() => navigate(`/hackathon/${ hackathon?.id }/create-resume/github`)}>
                        Импорт из Github
                    </Button>
                    <Button onClick={() => navigate(`/hackathon/${ hackathon?.id }/create-resume/pdf`)}>
                        Импорт из резюме pdf
                    </Button>
                    <Button onClick={() => navigate(`/hackathon/${ hackathon?.id }/create-resume/hh` )}>
                        Импорт из hh.ru
                    </Button>
                </Flex>
            </Flex>
        </AuthGuard>
    )
}