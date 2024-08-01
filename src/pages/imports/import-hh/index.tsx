import {Button, Center, Flex, Text} from "@mantine/core";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IconChevronLeft} from "@tabler/icons-react";
import {Anchor} from "@mantine/core";
import { AuthGuard } from "@/components/auth-guard";
import { createFormik } from "@/utils/create-formik.ts";
import * as yup from "yup";
import createCustomResume from "@/api/create-custom-resume.ts";
import { Form, Formik } from "formik";
import { FormInput } from "@/components/form-input/form-input.tsx";
import importHHResume from "@/api/import-hh-resume.ts";

export const ImportHh = () => {
    const params = useParams()
    const [hackathonId, setHackathonId] = useState(0);
    const navigate = useNavigate()
    
    useEffect(() => {
        setHackathonId(parseInt(params.hackathon_id ?? ''))
    }, [])

    const formik = createFormik({
        initialValues: {
            link: ''
        },
        validationSchema: yup.object({
            link: yup.string().required('Введите ссылку'),
        }),
        onSubmit: async ({link}, formikHelpers) => {
            const resume = await importHHResume(link)

            if (resume && hackathonId) {
                const success = await createCustomResume(hackathonId, {
                    bio: resume.bio,
                    soft: resume.softs,
                    tech: resume.hards,
                })

                if (success) {
                    navigate(`/hackathon/${hackathonId}/my-resume`)
                }
            } else {
                formikHelpers.setFieldError('link', 'Не удалось импортировать ваш hh')
            }
        }
    })
    
    return (
        <AuthGuard role='user'>
            <Formik { ...formik }>
                <Form>
                    <Flex component={ Center } h={ "100vh" } direction={ "column" } gap={ "xs" }>
                        <Text size={ "xl" } fw={500}>Импорт резюме из hh.ru</Text>
                        <Flex direction={ "column" } w={ "300px" } gap={ "xs" }>
                            <FormInput
                                name='link'
                                size={ "md" }
                                placeholder={ "Ссылка на ваш hh.ru" }
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