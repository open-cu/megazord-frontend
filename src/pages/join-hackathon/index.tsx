import { Button, Center, Flex, Loader, Text } from "@mantine/core";
import styles from './join-hackathon.module.css';
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import parseJwt from "@/utils/parse-jwt.ts";
import { AuthGuard } from "@/components/auth-guard";
import joinHackathon from "@/api/join-hackathon.ts";
import { IHackathon } from "@/models/IHackathon.ts";
import fetchHackathon from "@/api/fetch-hackathon.ts";
import useUser from "@/hooks/use-user.ts";

export const JoinHackathon = () => {
    const [searchParams] = useSearchParams();
    const [hackathon, setHackathon] = useState<IHackathon | null>()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const {user} = useUser()
    const [error, setError] = useState('')

    useEffect(() => {
        const id = parseInt(parseJwt(searchParams.get("hackathon_id") as string, 'id') ?? '')
        const email = parseJwt(searchParams.get("hackathon_id") as string, 'email')

        if (!id || !email) {
            navigate('/')
        }

        if (user) {
            if (user.email != email) {
                navigate('/')
            } else if (!loading && !hackathon) {
                setLoading(true)
                fetchHackathon(id)
                    .then(data => {
                        setHackathon(data);
                        setLoading(false);
                    })
            }
        }
    }, [user])

    const onClick = async () => {
        if (loading || !hackathon) return
        setError('')
        setLoading(true)

        const response = await joinHackathon(hackathon.id, searchParams.get("hackathon_id") as string)
        if (response == 'success') {
            navigate(`/hackathon/${ hackathon.id }/create-resume`)
        } else if (response == 'already-join') {
            navigate(`/hackathon/${ hackathon.id }`)
        } else {
            setError('Произошла непредвиденная ошибка')
        }
        
        setLoading(false)
    }

    if (!hackathon) {
        return <AuthGuard role='user'>
            <Center w='100vw' h='calc(100vh - 65px)'>
                <Loader size="md"/>
            </Center>
        </AuthGuard>
    }

    return (
        <AuthGuard role='user'>
            <Flex component={ Center } h={ "100vh" } direction={ "column" }>
                <Text fw="500" size={ "xl" } mb={ "sm" } className={ styles.title }>
                    Привет!
                    <br/>
                    Тебя пригласили на «{ hackathon.name }»
                </Text>
                <Button
                    loading={ loading }
                    onClick={ onClick }>
                    Принять приглашение
                </Button>
                {
                    error && <Text c='red' mt={16} ta='center'>{ error }</Text>
                }
            </Flex>
        </AuthGuard>
    )
}