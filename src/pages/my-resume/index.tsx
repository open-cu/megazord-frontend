import { AuthGuard } from "@/components/auth-guard";
import { Header } from "@/components/header";
import { ActionIcon, Button, Container, Flex, TextInput, Center, Loader } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import { IResume } from "@/models/IResume";
import { fetchResume } from "@/api/fetch-resume.ts";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from 'uuid'
import { createFormik } from "@/utils/create-formik";
import * as yup from 'yup';
import { Form, Formik } from "formik";
import { FormTextareaInput } from "@/components/form-input/form-textarea-input.tsx";
import { FormInput } from "@/components/form-input/form-input.tsx";
import { editResume } from "@/api/edit-resume.ts";

export const MyResume = () => {
    const [resume, setResume] = useState<IResume | null>(null)
    const {hackathon_id} = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        const userId = parseInt(localStorage.getItem('user_id') ?? '')
        const hackathonId = parseInt(hackathon_id ?? '')

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
                    ? <Content resume={ resume }/>
                    : <Center w='100vw' h='calc(100vh - 65px)'>
                        <Loader size="md"/>
                    </Center>
            }
        </AuthGuard>
    );
};

type ContentProps = {
    resume: IResume,
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
                <TextInput
                    w="100%"
                    value={ skill.value }
                    onChange={ e => change(e.target.value) }
                    placeholder="Введите tech skill"/>
                <ActionIcon variant="transparent" aria-label="Удалить tech skill" onClick={ remove }>
                    <IconTrash color="pink"/>
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
                    <IconTrash color="pink"/>
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
            } else {
                formikHelpers.setFieldError('bio', 'Произошла непредвиденная ошибка')
            }
        },
    })

    return <Container mb="xl">
        <h1>Ваше резюме</h1>

        <Formik { ...formik }>
            <Form>
                <FormTextareaInput autosize minRows={ 4 } name='bio' mt="md" placeholder="Опишите себя"/>

                <Container mt="xl" px={ 0 }>
                    <h3>Контакты</h3>
                    <Flex direction="column" gap="sm" mt="md">
                        <FormInput name='telegram' placeholder="Телеграм"/>
                        <FormInput name='githubLink' placeholder="Гитхаб"/>
                        <FormInput name='hhLink' placeholder="hh.ru"/>
                        <FormInput name='personalWebsite' placeholder="Сайт портфолио"/>
                    </Flex>
                </Container>

                <Container mt="xl" px={ 0 }>
                    <h3>Tech Skills</h3>
                    <Flex direction="column" gap="sm" mt="md">
                        { techSkillsItems }
                    </Flex>
                    <Button variant="subtle" mt="xs" onClick={ addTechSkill }>
                        Добавить
                    </Button>
                </Container>

                <Container mt="xl" px={ 0 }>
                    <h3>Soft Skills</h3>
                    <Flex direction="column" gap="sm" mt="md">
                        { softSkillsItems }
                    </Flex>
                    <Button variant="subtle" mt="xs" onClick={ addSoftSkill }>
                        Добавить
                    </Button>
                </Container>

                <Button mt="md" type='submit'>Сохранить</Button>
            </Form>
        </Formik>
    </Container>
}