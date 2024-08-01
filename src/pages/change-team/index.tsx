import { Header } from "@/components/header";
import { Container, Flex, TextInput, Text, UnstyledButton, Button, Loader, Center } from "@mantine/core";
import styles from './change-team.module.css'
import { ITeamVacancy } from "@/models/ITeamVacancy";
import { ChangeTeamVacancy } from "@/components/change-team-vacancy";
import { ITeam } from "@/models/ITeam.ts";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getTeam from "@/api/get-team.ts";
import getTeamVacancies from "@/api/get-team-vacancies.ts";
import useUser from "@/hooks/use-user.ts";
import { editTeam } from "@/api/edit-team.ts";

export const ChangeTeam = () => {
    const {hackathon_id, team_id} = useParams()
    const [team, setTeam] = useState<ITeam | null>(null)
    const [vacancies, setVacancies] = useState<ITeamVacancy[] | null>(null)
    const navigate = useNavigate()
    const {user} = useUser()

    useEffect(() => {
        const hackathonId = parseInt(hackathon_id ?? '')
        const teamId = parseInt(team_id ?? '')

        if (user && hackathonId && teamId) {
            getTeam(teamId).then(data => {
                if (data && user.id == data.creator) setTeam(data)
                else navigate(`/hackathon/${ hackathonId }/teams/${ teamId }`)
            })
            getTeamVacancies(teamId).then(data => {
                if (data) setVacancies(data)
                else navigate(`/hackathon/${ hackathonId }/teams/${ teamId }`)
            })
        }
    }, [user])

    return (
        <>
            <Header variant={ "user" }/>
            <Container size={ "md" } pb={ "100px" }>
                {
                    team != null && vacancies != null
                        ? <Content team={ team } vacancies={ vacancies }/>
                        : <Center w='100vw' h='calc(100vh - 65px)'>
                            <Loader size="md"/>
                        </Center>
                }
            </Container>
        </>
    )
}

type ContentProps = {
    team: ITeam,
    vacancies: ITeamVacancy[],
}

export type EditableVacancy = {
    id: number;
    name: string;
    keywords: string;
}

function createEditableVacancy(vacancy: ITeamVacancy): EditableVacancy {
    return {
        id: vacancy.id,
        name: vacancy.name,
        keywords: vacancy.keywords.join(', '),
    }
}

const Content: FC<ContentProps> = (props) => {
    const [title, setTitle] = useState(props.team.name)
    const [vacancies, setVacancies] = useState<EditableVacancy[]>(props.vacancies.map(createEditableVacancy))
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { hackathon_id, team_id } = useParams()

    const changeVacancy = (vacancy: EditableVacancy) => {
        setVacancies(vacancies.map(item => {
            if (item.id == vacancy.id) return vacancy
            return item
        }))
    }

    const deleteVacancy = (vacancy: EditableVacancy) => {
        setVacancies(vacancies.filter(item => item.id != vacancy.id))
    }

    const addVacancy = () => {
        setVacancies([
            ...vacancies,
            {
                id: -new Date().getTime(),
                name: '',
                keywords: '',
            }
        ])
    }

    const onSubmit = async () => {
        if (loading) return
        setLoading(true)
        const newVacancies = vacancies.filter(vacancy => vacancy.name)
        console.log(newVacancies);
        
        const success = await editTeam(
            props.team.id,
            {
                name: title,
                vacancies: newVacancies.map(item => ({
                    id: item.id < 0 ? 0 : item.id,
                    name: item.name,
                    keywords: [...new Set(item.keywords.split(',').map(x => x.trim()))],
                }))
            }
        )

        if (success) {
            navigate(`/hackathon/${hackathon_id}/teams/${team_id}`)
        }
        setLoading(false)
    }

    return <>
        <h1>Изменение команды</h1>
        <Flex direction={ "column" } gap={ "xl" } mt='md'>
            <TextInput
                label="Название команды"
                placeholder="Навзание команды"
                value={ title }
                onChange={ e => setTitle(e.target.value) }
            />
            <Flex direction={ "column" } gap={ "md" }>
                <Text fw={ 600 } mb={ "0" }>Вакансии</Text>
                {
                    vacancies.map(vacancy => {
                        return <ChangeTeamVacancy
                            key={ `vacancy-${ vacancy.id }` }
                            vacancy={ vacancy }
                            onChange={ changeVacancy }
                            onDelete={ deleteVacancy }
                        />
                    })
                }
            </Flex>
            <UnstyledButton>
                <Text
                    size="sm"
                    className={ styles.add_btn }
                    onClick={ addVacancy }>
                    Создать вакансию
                </Text>
            </UnstyledButton>
            <Button w={ "fit-content" } onClick={ onSubmit }>Сохранить</Button>
        </Flex>
    </>
}