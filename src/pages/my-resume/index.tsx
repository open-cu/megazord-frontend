import {AuthGuard} from "@/components/auth-guard";
import {Header} from "@/components/header";
import {ActionIcon, Autocomplete, Button, Center, Container, Flex, Loader, TextInput} from "@mantine/core";
import {IconTrash} from "@tabler/icons-react";
import {FC, useEffect, useState} from "react";
import {IResume} from "@/models/IResume";
import {fetchResume} from "@/api/fetch-resume.ts";
import {useNavigate, useParams} from "react-router-dom";
import {v4 as uuid} from 'uuid'
import {createFormik} from "@/utils/create-formik";
import * as yup from 'yup';
import {Form, Formik} from "formik";
import {FormTextareaInput} from "@/components/form-input/form-textarea-input.tsx";
import {FormInput} from "@/components/form-input/form-input.tsx";
import {editResume} from "@/api/edit-resume.ts";
import {skills} from "@/utils/skills";
import {useFetchHackathon} from "@/hooks/use-fetch-hackathon";
import {HackathonStatus} from "@/models/IHackathon";
import {toast} from "@/utils/toasts";

export const MyResume = () => {
    const [resume, setResume] = useState<IResume | null>(null)
    const {hackathon_id} = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        const userId = localStorage.getItem('user_id') ?? ''
        const hackathonId = hackathon_id ?? ''

        if (userId && hackathon_id) {
            fetchResume(userId, hackathonId).then(data => {
                if (data) {
                    setResume(data)
                } else {
                    navigate('/')
                }
            })
        } else {
            navigate('/')
        }
    }, [])

    return (
        <AuthGuard role="user">
            <Header variant="user"/>
            {
                resume
                    ? <Content resume={ resume } hackathon_id={hackathon_id}/>
                    : <Center w='100vw' h='calc(100vh - 65px)'>
                        <Loader size="md"/>
                    </Center>
            }
        </AuthGuard>
    );
};

type ContentProps = {
    resume: IResume,
    hackathon_id: string,
}

type EditableItem = {
    id: string;
    value: string;
}

const createEditableItem = (value: string): EditableItem => ({id: uuid(), value})

const Content: FC<ContentProps> = (props) => {
    const navigate = useNavigate()

    const [techSkills, setTechSkills] = useState(props.resume.techStack.map(createEditableItem))
    const [softSkills, setSoftSkills] = useState(props.resume.softSkills.map(createEditableItem))
    const [hackathon] = useFetchHackathon(props.hackathon_id)

    const addTechSkill = () => setTechSkills([...techSkills, createEditableItem('')])

    const addSoftSkill = () => setSoftSkills([...softSkills, createEditableItem('')])

    const techSkillsItems = techSkills.map(skill => {
        const change = (value: string) => {
            setTechSkills(
                techSkills.map(item => {
                    if (item.id === skill.id) {
                        return {...item, value}
                    } else {
                        return item
                    }
                })
            )
        }

        const remove = () => {
            setTechSkills(
                techSkills.filter(item => item.id != skill.id)
            )
        }

        return (
            <Flex gap="xs" w="100%" align="center" key={ skill.id }>
                <Autocomplete
                    w="100%"
                    value={ skill.value }
                    onChange={change}
                    placeholder="Введите tech skill"
                    data={skills}
                />
                <ActionIcon variant="transparent" aria-label="Удалить tech skill" onClick={ remove }>
                    <IconTrash
                        color='var(--mantine-color-red-text)'
                        stroke={ 1.8 }
                        size={ 26 }
                    />
                </ActionIcon>
            </Flex>
        );
    })

    const softSkillsItems = softSkills.map(skill => {
        const change = (value: string) => {
            setSoftSkills(
                softSkills.map(item => {
                    if (item.id === skill.id) {
                        return {...item, value}
                    } else {
                        return item
                    }
                })
            )
        }

        const remove = () => {
            setSoftSkills(
                softSkills.filter(item => item.id != skill.id)
            )
        }

        return (
            <Flex gap="xs" w="100%" align="center" key={ skill.id }>
                <TextInput
                    w="100%"
                    value={ skill.value }
                    onChange={ e => change(e.target.value) }
                    placeholder="Введите soft skill"/>
                <ActionIcon variant="transparent" aria-label="Удалить soft skill" onClick={ remove }>
                    <IconTrash
                        color='var(--mantine-color-red-text)'
                        stroke={ 1.8 }
                        size={ 26 }
                    />
                </ActionIcon>
            </Flex>
        );
    })

    const formik = createFormik({
        initialValues: {
            bio: props.resume.bio ?? '',
            telegram: props.resume.telegram ?? '',
            githubLink: props.resume.githubLink ?? '',
            hhLink: props.resume.hhLink ?? '',
            personalWebsite: props.resume.personalWebsite ?? '',
        },
        validationSchema: yup.object({
            bio: yup.string().max(1000, 'Максимум 1000 символов'),
            telegram: yup.string().max(100, 'Максимум 100 символов'),
            githubLink: yup.string().max(100, 'Максимум 100 символов').matches(
                /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                'Неверный url'
            ),
            hhLink: yup.string().max(100, 'Максимум 100 символов').matches(
                /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                'Неверный url'
            ),
            personalWebsite: yup.string().max(100, 'Максимум 100 символов').matches(
                /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                'Неверный url'
            ),
        }),
        onSubmit: async (values, formikHelpers) => {
            const success = await editResume(
                props.resume.hackathonId,
                {
                    bio: values.bio,
                    telegram: values.telegram,
                    hh: values.hhLink,
                    github: values.githubLink,
                    personalWebsite: values.personalWebsite,
                    tech: techSkills.map(x => x.value),
                    soft: softSkills.map(x => x.value),
                }
            )

            if (success) {
                navigate(`/hackathon/${ props.resume.hackathonId }`)
                toast({
                    type: "success",
                    message: "Резюме сохранено"
                })
            } else {
                formikHelpers.setFieldError('bio', 'Произошла непредвиденная ошибка')
                toast({
                    type: "error",
                    message: "Произошла непредвиденная ошибка"
                })
            }
        },
    })

    return <Container mb="xl">
        <h1>Ваше резюме</h1>

        <Formik { ...formik }>
            <Form>
                <FormTextareaInput autosize minRows={ 4 } name='bio' mt="md" placeholder="Опишите себя" disabled={hackathon?.status == HackathonStatus.Ended}/>

                <Container mt="xl" px={ 0 }>
                    <h3>Контакты</h3>
                    <Flex direction="column" gap="sm" mt="md">
                        <FormInput name='telegram' placeholder="Телеграм" disabled={hackathon?.status == HackathonStatus.Ended}/>
                        <FormInput name='githubLink' placeholder="Гитхаб" disabled={hackathon?.status == HackathonStatus.Ended}/>
                        <FormInput name='hhLink' placeholder="hh.ru" disabled={hackathon?.status == HackathonStatus.Ended}/>
                        <FormInput name='personalWebsite' placeholder="Сайт портфолио" disabled={hackathon?.status == HackathonStatus.Ended}/>
                    </Flex>
                </Container>

                {(props.resume.role && props.resume.role != "") && <Container mt="xl" px={0}>
                    <h3>Роль в хакатоне {hackathon?.name}</h3>
                    <FormInput name='role' placeholder="Роль" disabled value={props.resume.role}/>
                </Container>}

                <Container mt="xl" px={ 0 }>
                    <h3>Tech Skills</h3>
                    <Flex direction="column" gap="sm" mt="xs">
                        { techSkillsItems }
                    </Flex>
                    <Button variant="subtle" mt="xs" onClick={ addTechSkill } disabled={hackathon?.status == HackathonStatus.Ended}>
                        Добавить
                    </Button>
                </Container>

                <Container mt="xl" px={ 0 }>
                    <h3>Soft Skills</h3>
                    <Flex direction="column" gap="sm" mt="xs">
                        { softSkillsItems }
                    </Flex>
                    <Button variant="subtle" mt="xs" onClick={ addSoftSkill } disabled={hackathon?.status == HackathonStatus.Ended}>
                        Добавить
                    </Button>
                </Container>

                {hackathon?.status != HackathonStatus.Ended && <Button mt="md" type='submit'>Сохранить</Button>}
            </Form>
        </Formik>
    </Container>
}