import {Button, Center, Flex, Loader, Select, Text} from "@mantine/core";
import styles from './join-hackathon.module.css';
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {AuthGuard} from "@/components/auth-guard";
import joinHackathon from "@/api/join-hackathon.ts";
import {IHackathon} from "@/models/IHackathon.ts";
import fetchHackathon from "@/api/fetch-hackathon.ts";
import useUser from "@/hooks/use-user.ts";
import {SwitchThemeBtn} from "@/components/switch-theme-btn";

export const JoinHackathon = () => {
    const [searchParams] = useSearchParams();
    const [hackathon, setHackathon] = useState<IHackathon | null>()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const {user} = useUser()
    const [error, setError] = useState('')
    const [role, setRole] = useState('')

    useEffect(() => {
        const id = searchParams.get("hackathon_id") as string ?? ''

        if (!id) {
            navigate('/')
        }

        if (user) {
            setLoading(true)
            fetchHackathon(id)
                .then(data => {
                    setHackathon(data);
                    setLoading(false);
                })
        }
    }, [user])

    const onClick = async () => {
        if (loading || !hackathon) return
        setError('')
        setLoading(true)

        const response = await joinHackathon(hackathon.id, role)
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
            <Flex component={ Center } h={ "100vh" } direction={ "column" } gap={"sm"} style={{ position: "relative" }}>
                <SwitchThemeBtn style={{ position: "absolute", bottom: "5%", right: "5%" }} size={"lg"} />
                <Text fw="500" size={ "xl" } className={ styles.title } truncate={"end"} px={"md"}>
                    Привет!
                    <br/>
                    Тебя пригласили на «{ hackathon.name }»
                </Text>
                {hackathon.roles.length != 0 && <Select
                    required
                    value={role}
                    onChange={setRole}
                    size={"md"}
                    placeholder="Выбери роль"
                    clearable
                    allowDeselect
                    checkIconPosition="right"
                    data={hackathon.roles}
                />}
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