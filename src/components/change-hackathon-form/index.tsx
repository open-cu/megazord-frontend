import { Form, Formik } from "formik";
import { Autocomplete, Button, Container, FileInput, Flex, Image, Text, FileButton } from "@mantine/core";
import { FormInput } from "@/components/form-input/form-input";
import { FormTextareaInput } from "@/components/form-input/form-textarea-input";
import { FormNumberInput } from "@/components/form-input/form-number-input";
import { IconPlus, IconUpload} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createFormik } from "@/utils/create-formik";
import { IHackathon } from "@/models/IHackathon";
import addParticipantToHackathon from "@/api/add-participant-to-hackathon";
import changeHackathon from "@/api/change-hackathon";
import * as yup from "yup";
import uploadEmailsCsv from "@/api/upload-emails-csv";

export const ChangeHackathonForm = (
    {hackathon, updateHackathonFunc}: { hackathon: IHackathon, updateHackathonFunc: () => void }
) => {
    const navigate = useNavigate()

    const [file, setFile] = useState<File | null>(null)
    const [csvFile, setCsvFile] = useState<File | null>(null);

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
            if (csvFile)
                await uploadEmailsCsv(hackathon.id, csvFile).then(res => {
                    if (!res)
                        setParticipantInputError("Ошибка при иммпорте файла")
                    else
                        changeHackathon(hackathon.id, file, values).then(res => {
                            if (!res) setParticipantInputError("Непредвиденная ошибка")
                            else navigate('/')
                        })
                })
            else {
                changeHackathon(hackathon.id, file, values).then(res => {
                    if (!res) setParticipantInputError("Непредвиденная ошибка")
                    else navigate('/')
                })
            }
        }
    })

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
                    <Container p={ "0" } w={ "100%" }>
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
                            <FileButton onChange={setCsvFile} accept="csv">
                                {(props) => <Button {...props}>
                                    <IconUpload stroke={ 2 } size={ 20 } />
                                </Button>}
                            </FileButton>
                            <Button
                                loading={ loading }
                                size={ "sm" }
                                onClick={ () => addParticipant(participantInputValue) }>
                                <IconPlus stroke={ 2 } size={ 20 }/>
                            </Button>
                        </Flex>
                        { csvFile && (
                            <Text size="xs" ta="center">
                                Выбранный файл: {csvFile.name}
                            </Text>
                        )}
                        {
                            successMessage && <Text size='sm' c='green'>{ successMessage }</Text>
                        }
                    </Container>
                    <Button w={ "fit-content" } type={ "submit" }>Сохранить</Button>
                </Flex>
            </Form>
        </Formik>
    )
}