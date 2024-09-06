import {Button, Center, Flex, Text} from "@mantine/core";
import styles from './join-team.module.css';
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import parseJwt from "@/utils/parse-jwt.ts";
import {AuthGuard} from "@/components/auth-guard";
import joinTeamById from "@/api/join-team-by-id";
import getTeam from "@/api/get-team";
import {ITeam} from "@/models/ITeam";
import useUser from "@/hooks/use-user.ts";
import {toast} from "@/utils/toasts";
import {SwitchThemeBtn} from "@/components/switch-theme-btn";

export const JoinTeam = () => {
    const [searchParams] = useSearchParams();
    const [team, setTeam] = useState<ITeam | null>()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const {user} = useUser()

    useEffect(() => {
        const id = parseJwt(searchParams.get("team_id") as string, 'id') ?? ''
        const email = parseJwt(searchParams.get("team_id") as string, 'email')

        if (!id) {
            navigate('/')
        } else if (user) {
            if (user.email !== email) {
                navigate('/')
            } else {
                getTeam(id)
                    .then(data => {
                        setTeam(data);
                        setLoading(false);
                    })
            }
        }

    }, [user])

    const onClick = async () => {
        const id = parseJwt(searchParams.get("team_id") as string, 'id') ?? ''
        const token = searchParams.get("team_id")

        if (loading || !team || !token || !id || !user) return
        setLoading(true)

        const success = await joinTeamById(team.id, token)
        if (success) {
            toast({
                type: "success",
                message: `Вы успешно присоеденились к команде ${team.name}!`
            })
            navigate("/")
        } else {
            toast({
                type: "error",
                message: "Произошла ошибка"
            })
        }
    }

    if (!team) {
        return <AuthGuard role='user'/>
    }

    return (
        <AuthGuard role='user'>
            <Flex component={ Center } h={ "100vh" } direction={ "column" } style={{ position: "relative" }}>
                <SwitchThemeBtn style={{ position: "absolute", bottom: "5%", right: "5%" }} size={"lg"} />
                <Text fw="500" size={ "xl" } mb={ "sm" } className={ styles.title }>
                    Привет!
                    <br/>
                    Тебя пригласили в команду «{ team.name }»
                </Text>
                <Button
                    loading={ loading }
                    onClick={ onClick }>
                    Принять приглашение
                </Button>
            </Flex>
        </AuthGuard>
    )
}