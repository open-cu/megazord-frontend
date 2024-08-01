import { Header } from "@/components/header";
import { Container, Flex, TextInput, Text, UnstyledButton, Button } from "@mantine/core";
import styles from '@/pages/change-team/change-team.module.css'
import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTeam } from "@/api/create-team";
import { ChangeTeamVacancy } from "@/components/change-team-vacancy";

export const CreateTeam = () => {
    const {hackathon_id} = useParams()

    return (
        <>
            <Header variant={ "user" }/>
            <Container size={ "md" } pb={ "100px" }>
                <Content hackathonId={ parseInt(hackathon_id ?? '') }/>
            </Container>
        </>
    )
}

export type EditableVacancy = {
    id: number;
    name: string;
    keywords: string;
}

type ContentProps = {
    hackathonId: number
}

const createDefaultVacancy = () => {
    return {
        id: new Date().getTime(),
        name: '',
        keywords: '',
    }
}

const Content: FC<ContentProps> = (props) => {
    const [title, setTitle] = useState('')
    const [vacancies, setVacancies] = useState<EditableVacancy[]>([createDefaultVacancy()])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const {hackathon_id} = useParams()

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

        const id = await createTeam(
            props.hackathonId,
            {
                name: title,
                vacancies: newVacancies.map(item => ({
                    id: item.id < 0 ? 0 : item.id,
                    name: item.name,
                    keywords: item.keywords.split(',').map(x => x.trim()),
                }))
            }
        )

        if (id) {
            navigate(`/hackathon/${ hackathon_id }/teams/${id}`)
        } 
        setLoading(false)
    }

    return <>
        <h1>Создание команды</h1>
        <Flex direction={ "column" } gap={ "xl" } mt='md'>
            <TextInput
                label="Название команды"
                placeholder="Название команды"
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
            <Button
                w={ "fit-content" }
                onClick={ onSubmit }>
                Сохранить
            </Button>
        </Flex>
    </>
}