import { Button, Center, Flex, Text } from "@mantine/core";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from './create-resume.module.css'
import { AuthGuard } from "@/components/auth-guard";
import { IHackathon } from "@/models/IHackathon";
import fetchHackathonById from "@/api/fetch-hackathon";
import createCustomResume from "@/api/create-custom-resume";

export const CreateResume = () => {
    const params = useParams()
    const [hackathon, setHackathon] = useState<IHackathon | null>()
    const [customResumeLoading, setCustomResumeLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const id = parseInt(params.hackathon_id ?? '')

        if (id) {
            fetchHackathonById(id).then(setHackathon)
        } else {
            navigate('/')
        }
    }, [])


    const onCreateCustomResume = async () => {
        if (hackathon && !customResumeLoading) {
            setCustomResumeLoading(true)

            const success = await createCustomResume(hackathon.id)
            if (success) {
                navigate(`/hackathon/${ hackathon.id }/my-resume`)
            } else {
                console.error('error')
            }
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
                    <Button>
                        <Link to={ `/hackathon/${ hackathon.id }/create-resume/github` }>
                            Импорт из Github
                        </Link>
                    </Button>
                    <Button>
                        <Link to={ `/hackathon/${ hackathon.id }/create-resume/pdf` }>
                            Импорт из резюме pdf
                        </Link>
                    </Button>
                    <Button>
                        <Link to={ `/hackathon/${ hackathon.id }/create-resume/hh` }>
                            Импорт из hh.ru
                        </Link>
                    </Button>
                </Flex>
            </Flex>
        </AuthGuard>
    )
}