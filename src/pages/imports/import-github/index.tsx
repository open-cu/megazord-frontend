import {Anchor, Button, Center, Flex, Text} from "@mantine/core";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IconBrandGithub, IconChevronLeft} from "@tabler/icons-react";
import {AuthGuard} from "@/components/auth-guard";
import {createFormik} from "@/utils/create-formik.ts";
import {Form, Formik} from "formik";
import * as yup from 'yup';
import importGithubResume from "@/api/import-github-resume.ts";
import createCustomResume from "@/api/create-custom-resume.ts";
import {FormInput} from "@/components/form-input/form-input.tsx";
import {toast} from "@/utils/toasts";

export const ImportGithub = () => {
    const params = useParams()
    const [hackathonId, setHackathonId] = useState<number>();
    const navigate = useNavigate()

    useEffect(() => {
        setHackathonId(params.hackathon_id ?? '')
    }, [])

    const formik = createFormik({
        initialValues: {
            link: ''
        },
        validationSchema: yup.object({
            link: yup.string().required('Введите ссылку').url('Неверная ссылка')
        }),
        onSubmit: async ({link}, formikHelpers) => {
            const resume = await importGithubResume(link)
            
            if (resume && hackathonId) {
                const status = await createCustomResume(hackathonId, {
                    bio: resume.bio,
                    soft: resume.softs,
                    tech: resume.hards,
                })

                if (status === 201) {
                    navigate(`/hackathon/${hackathonId}/my-resume`)
                    toast({
                        type: "success",
                        message: "Резюме успешно создано!"
                    })
                } else if (status === 409) {
                    navigate(`/hackathon/${hackathonId}/my-resume`)
                    toast({
                        type: "error",
                        message: "У вас уже есть резюме"
                    })
                } else toast({
                    type: "error",
                    message: "Произошла какая-то ошибка"
                })
            } else {
                formikHelpers.setFieldError('link', 'Не удалось импортировать ваш гитхаб')
            }
        }
    })


    return (
        <AuthGuard role='user'>
            <Formik { ...formik }>
                <Form>
                    <Flex component={ Center } h={ "100vh" } direction={ "column" } gap={ "xs" }>
                        <Text size={ "xl" } fw={500}>Импорт резюме из Github</Text>
                        <Flex direction={ "column" } w={ "300px" } gap={ "xs" }>
                            <FormInput
                                name='link'
                                size={ "md" }
                                placeholder={ "Ссылка на ваш github" }
                                leftSection={ <IconBrandGithub stroke={ 2 } size={ 20 }/> }
                            />
                            <Button type='submit'>Анализировать</Button>
                        </Flex>
                        <Anchor component={ Link } to={ `/hackathon/${ hackathonId }/create-resume/` }>
                            <Flex align={ "center" } gap={ "5px" }>
                                <IconChevronLeft stroke={ 2 } size={ 18 }/>
                                <Text>Вернуться к выбору</Text>
                            </Flex>
                        </Anchor>
                    </Flex>
                </Form>
            </Formik>
        </AuthGuard>
    )
}