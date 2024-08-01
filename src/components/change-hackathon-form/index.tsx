import { Form, Formik } from "formik";
import { Autocomplete, Button, Container, FileInput, Flex, Image, Text } from "@mantine/core";
import { FormInput } from "@/components/form-input/form-input";
import { FormTextareaInput } from "@/components/form-input/form-textarea-input";
import { FormNumberInput } from "@/components/form-input/form-number-input";
import { IconPlus } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import styles from "@/pages/change-hackathon/change-hackathon.module.css";
import { useEffect, useState } from "react";
import { createFormik } from "@/utils/create-formik";
import { IHackathon } from "@/models/IHackathon";
import addParticipantToHackathon from "@/api/add-participant-to-hackathon";
import changeHackathon from "@/api/change-hackathon";
import { getPercentWithTeam } from "@/api/get-percent-with-team";
import * as yup from "yup";

export const ChangeHackathonForm = (
    {hackathon, updateHackathonFunc}: { hackathon: IHackathon, updateHackathonFunc: () => void }
) => {
    const navigate = useNavigate()

    const [file, setFile] = useState<File | null>(null)
    const [previewLink, setPreviewLink] = useState<string>(
        hackathon.imageCover ?
            `${ import.meta.env.VITE_BACKEND_URL }${ hackathon.imageCover }` :
            '/img-placeholder.jpg'
    )
    const [previewError, setPreviewError] = useState<string>('')
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const participants = hackathon.participants.map(item => item.email)
    const [participantInputError, setParticipantInputError] = useState<string>('')
    const [participantInputValue, setParticipantInputValue] = useState<string>('')
    const [percentWithTeam, setPercentWithTeam] = useState(0)
    const [loading, setLoading] = useState(false)

    const addParticipant = (email: string) => {
        if (participants.includes(email)) setParticipantInputError("Пользователь уже добавлен")
        else {
            setLoading(true)
            addParticipantToHackathon(hackathon.id, email).then((res) => {
                if (!res) setParticipantInputError("Непредвимиая ошибка")
                else {
                    setSuccessMessage(`Пользователю ${ email } отправлено приглашение`)
                    setParticipantInputValue('')
                }
                setLoading(false)
            })
            updateHackathonFunc()
        }
    }

    const formik = createFormik({
        initialValues: {
            name: hackathon.name,
            description: hackathon.description,
            max_participants: hackathon.max_participants,
        },
        validationSchema: yup.object({
            name: yup.string().required('Поле обязательно'),
            description: yup.string().required('Описание обязательно'),
            max_participants: yup.number()
                .integer('Целое оно должно быть...')
                .min(yup.ref('max_participants'), 'Меньше минимального кол-во участников')
                .max(7, 'Не более семи участника в одной команде'),
        }),
        onSubmit: async (values) => {
            changeHackathon(hackathon.id, file, values).then(res => {
                if (!res) setParticipantInputError("Непредвиденная ошибка")
                else navigate('/')
            })
        }
    })

    useEffect(() => {
        getPercentWithTeam(hackathon.id).then(data => {
            setPercentWithTeam(data)
        })
    }, [])

    return (
        <Formik { ...formik }>
            <Form>
                <Flex direction="column" gap="md">
                    <FormInput
                        name="name"
                        label="Название хакатона"
                        placeholder="Введите название хакатона"
                    />
                    <FormTextareaInput
                        name="description"
                        label="Описание хакатона"
                        placeholder="Введите описание хакатона"
                        autosize
                    />
                    <FormNumberInput
                        name="max_participants"
                        label="Макс количество участников в команде"
                        disabled
                        placeholder="Введите макс количество участников в команде"
                    />
                    <Container p={ "0" } w={ "100%" }>
                        <FileInput
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
                    <Flex justify={ "space-between" } gap={ "xs" }
                          align={ participantInputError ? "center" : "flex-end" }>
                        <Autocomplete
                            error={ participantInputError }
                            label={ `Участники (Всего: ${ hackathon.participants.length })` }
                            placeholder={ "Введите email участника" }
                            value={ participantInputValue }
                            onChange={ (e) => {
                                setParticipantInputValue(e)
                                setParticipantInputError('')
                                setSuccessMessage('')
                            } }
                            w={ "100%" }
                            data={ participants }
                            limit={ 5 }
                        />
                        
                        <Button
                            loading={ loading }
                            size={ "sm" }
                            onClick={ () => addParticipant(participantInputValue) }>
                            <IconPlus stroke={ 2 } size={ 20 }/>
                        </Button>
                    </Flex>
                    {
                        successMessage && <Text size='sm' c='green'>{ successMessage }</Text>
                    }
                    {
                        participants.length !== 0 && <Text size="sm" mt={ 10 }>
                            Уже <strong>{ percentWithTeam }%</strong> участиков находится в команде
                        </Text>
                    }
                    <Button w={ "fit-content" } type={ "submit" }>Сохранить</Button>
                    <Link
                        to={ `/hackathon/${ hackathon.id }/org/teams` }
                        className={ styles.link }
                    >
                        Смотреть команды
                    </Link>
                </Flex>
            </Form>
        </Formik>
    )
}