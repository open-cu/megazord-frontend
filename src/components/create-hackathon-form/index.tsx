import { Form, Formik } from "formik";
import {
    Accordion, AccordionControl,
    AccordionItem, AccordionPanel,
    Button,
    Container, FileButton,
    FileInput,
    Flex,
    Image,
    Text,
    TextInput
} from "@mantine/core";
import { FormInput } from "@/components/form-input/form-input";
import { FormTextareaInput } from "@/components/form-input/form-textarea-input";
import { FormNumberInput } from "@/components/form-input/form-number-input";
import {IconPlus, IconTrash, IconUpload} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createFormik } from "@/utils/create-formik";
import createHackathon, { CreateHackathonPayload } from "@/api/create-hackathon";
import * as yup from 'yup'
import './create-hackathon-form.css'
import {toast} from "@/utils/toasts";

const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const CreateHackathonForm = () => {
    const navigate = useNavigate()

    const [file, setFile] = useState<File | null>(null)
    const [csvFile, setCsvFile] = useState<File | null>(null);
    const [previewLink, setPreviewLink] = useState<string>('/img-placeholder.jpg')
    const [previewError, setPreviewError] = useState<string>('')
    const [loading, setLoading] = useState(false)

    const [roles, setRoles] = useState<string[]>([])
    const [roleInputError, setRoleInputError] = useState<string>('')
    const [roleInputValue, setRoleInputValue] = useState<string>('')

    const [participants, setParticipants] = useState<string[]>([])
    const [participantInputError, setParticipantInputError] = useState<string>('')
    const [participantInputValue, setParticipantInputValue] = useState<string>('')

    const addParticipant = (email: string) => {
        if (!emailRegexp.test(email)) {
            return setParticipantInputError("Некорректный email")
        }

        if (participants.includes(email)) setParticipantInputError("Пользователь уже добавлен")
        else {
            setParticipants([...participants, email])
            setParticipantInputValue('')
        }
    }

    const addRole = (role: string) => {
        if (roles.includes(role)) setRoleInputError("Роль уже добавлена")
        else {
            setRoles([...roles, role])
            setRoleInputValue('')
        }
    }

    const deleteParticipant = (email: string) => {
        if (!participants.includes(email)) setParticipantInputError("В списке нет такого участника")
        else setParticipants(participants.filter((item) => item != email))
    }

    const deleteRole = (role: string) => {
        if (!participants.includes(role)) setParticipantInputError("В списке нет такой роли")
        else setParticipants(participants.filter((item) => item != role))
    }

    const formik = createFormik({
        initialValues: {
            name: '',
            description: '',
            max_participants: 5,
        },
        validationSchema: yup.object({
            name: yup.string().required('Поле обязательно'),
            description: yup.string().required('Описание обязательно'),
            max_participants: yup.number()
                .integer('Целое оно должно быть...')
                .min(1, 'Не менее одного участника в одной команде')
                .max(7, 'Не более семи участника в одной команде'),
        }),
        onSubmit: async (values) => {
            if (!previewLink || previewLink == '/img-placeholder.jpg' || !file) {
                setPreviewError('Ошибка загрузки картинки')
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                setPreviewError('Картинка не может весить больше 2МБ')
            }
            const data = {
                ...values,
                participants: participants,
                roles: roles,
            } as CreateHackathonPayload
            setLoading(true)
            await createHackathon(file, csvFile, data).then(res => {
                if (!res) setParticipantInputError("Непредвиденная ошибка")
                else {
                    navigate('/')
                    toast({
                        type: "success",
                        message: `Вы успешно создали хакатон "${values.name}"`
                    })
                }
            })
            setLoading(false)
        }
    })

    return (
        <Formik { ...formik }>
            <Form>
                <Flex direction="column" gap="md">
                    <FormInput
                        required
                        name="name"
                        label="Название хакатона"
                        placeholder="Введите название хакатона"
                    />
                    <FormTextareaInput
                        required
                        name="description"
                        label="Описание хакатона"
                        autosize
                        placeholder="Введите описание хакатона"
                    />
                    <FormNumberInput
                        required
                        name="max_participants"
                        label="Макс количество участников в команде"
                        placeholder="Введите макс количество участников в команде"
                    />

                    <Container p={ "0" } w={ "100%" }>
                        <Flex
                            justify={ "space-between" }
                            gap={ "xs" }
                            align={ roleInputError ? "center" : "flex-end" }>

                            <TextInput
                                error={ roleInputError }
                                label={ `Роли в хакатоне` }
                                placeholder={ "Введите роль хакатона" }
                                value={ roleInputValue }
                                onChange={ (e) => {
                                    setRoleInputValue(e.target.value)
                                    setRoleInputError('')
                                } }
                                w={ "100%" }
                            />
                            <Button size={ "sm" } onClick={ () => addRole(roleInputValue) }>
                                <IconPlus stroke={ 2 } size={ 20 }/>
                            </Button>
                        </Flex>
                        <Accordion defaultValue='role'>
                            <AccordionItem value='role' style={ {borderBottom: 'none'} }>
                                <AccordionControl p={ 0 }>Список ролей хакатона</AccordionControl>
                                {
                                    roles.map(role => {
                                        return <AccordionPanel key={role}>
                                            <Flex
                                                justify='space-between' p={"10px 15px"}
                                                align={"center"}
                                                style={ {borderRadius: 8, border: '1px solid var(--stroke-color)'} }
                                            >
                                                <Text fw={ 500 } size={"sm"}>{ role }</Text>
                                                <IconTrash
                                                    color='pink'
                                                    style={ {cursor: 'pointer'} }
                                                    onClick={ () => deleteRole(role) }/>
                                            </Flex>
                                        </AccordionPanel>
                                    })
                                }
                            </AccordionItem>
                        </Accordion>
                    </Container>

                    <Container p={ "0" } w={ "100%" }>
                        <FileInput
                            required
                            w={ "100%" }
                            value={ file }
                            onChange={ (e) => {
                                if (e) {
                                    setPreviewError('')
                                    setFile(e)
                                    setPreviewLink(URL.createObjectURL(e))
                                } else {
                                    setPreviewError('Некорректное изображение')
                                }
                            } }
                            accept="image/png,image/jpeg"
                            label="Превью хакатона"
                            placeholder="Загрузите картинку"
                            error={ previewError }
                        />
                        <Image
                            mt={ "xs" }
                            src={ previewLink }
                            mah={ 350 }
                            w={ "100%" }
                            radius="sm"
                        />
                    </Container>
                    <Container p={ "0" } w={ "100%" }>
                        <Flex
                            justify={ "space-between" }
                            gap={ "xs" }
                            align={ participantInputError ? "center" : "flex-end" }>

                            <TextInput
                                error={ participantInputError }
                                label={ `Участники (Всего: ${ participants.length })` }
                                placeholder={ "Введите email участника" }
                                value={ participantInputValue }
                                onChange={ (e) => {
                                    setParticipantInputValue(e.target.value)
                                    setParticipantInputError('')
                                } }
                                w={ "100%" }
                            />
                            <FileButton onChange={(e) => {
                                setCsvFile(e)
                                toast({
                                    type: "success",
                                    message: "Файл успешно загружен"
                                })
                            }} accept="csv">
                                {(props) => <Button {...props}>
                                    <IconUpload stroke={ 2 } size={ 20 } />
                                </Button>}
                            </FileButton>
                            <Button size={ "sm" } onClick={ () => addParticipant(participantInputValue) }>
                                <IconPlus stroke={ 2 } size={ 20 }/>
                            </Button>
                        </Flex>
                        { csvFile && (
                            <Text size="xs" ta="center">
                                Выбранный файл: {csvFile.name}
                            </Text>
                        )}
                        <Accordion defaultValue='email'>
                            <AccordionItem value='email' style={ {borderBottom: 'none'} }>
                                <AccordionControl p={ 0 }>Список участников хакатона</AccordionControl>
                                {
                                    participants.map(email => {
                                        return <AccordionPanel key={ email } p={ 0 }>
                                            <Flex
                                                justify='space-between' p={"10px 15px"}
                                                align={"center"}
                                                style={ {borderRadius: 8, border: '1px solid var(--stroke-color)'} }>
                                                <Text fw={ 500 }>{ email }</Text>
                                                <IconTrash
                                                    color='pink'
                                                    style={ {cursor: 'pointer'} }
                                                    onClick={ () => deleteParticipant(email) }/>
                                            </Flex>
                                        </AccordionPanel>
                                    })
                                }
                            </AccordionItem>
                        </Accordion>
                    </Container>

                    <Button loading={loading} w={ "fit-content" } type={ "submit" }>Создать</Button>
                </Flex>
            </Form>
        </Formik>
    )
}