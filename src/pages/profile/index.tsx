import { Header } from "@/components/header";
import { Button, Container, Flex, Select, TextInput } from "@mantine/core";
import { AuthGuard } from "@/components/auth-guard";
import { createFormik } from "@/utils/create-formik.ts";
import useUser from "@/hooks/use-user.ts";
import { Form, Formik } from "formik";
import { FormInput } from "@/components/form-input/form-input.tsx";
import { FormNumberInput } from "@/components/form-input/form-number-input.tsx";
import updateProfile from "@/api/update-profile.ts";
import { cities } from "@/utils/cities.ts"
import { useState } from "react";
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";

export const Profile = () => {
    return (
        <AuthGuard role='any'>
            <Header variant="default"/>
            <Container size={ "md" }>
                <h1>Ваш профиль</h1>
                <Content/>
            </Container>
        </AuthGuard>
    )
}

const Content = () => {
    const {user, setUser} = useUser()
    const [city, setCity] = useState<string | null>(user!.city ?? null)
    const navigate = useNavigate()

    const formik = createFormik({
        initialValues: {
            name: user!.name,
            age: user!.age ? user!.age!.toString() : '',
            workExp: user!.workExp ? user!.workExp!.toString() : '',
        },
        validationSchema: yup.object({
            name: yup.string().required('Введите имя').max(30, 'Имя слишком длинное'),
            age: yup.number().min(0, 'Возраст не может быть отрицательным').integer('Введите целое число лет'),
            workExp: yup.number().min(0, 'Опыт не может быть отрицательным').integer('Опыт целое число лет'),
        }),
        onSubmit: async (values) => {
            const response = await updateProfile({
                name: values.name,
                age: parseInt(values.age) ?? null,
                city: city ?? '',
                workExp: parseInt(values.workExp) ?? null,
            })

            if (response) {
                setUser(response)
            } else {
                console.error('failed to update profile')
            }
        }
    })

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user_id')
        setUser(null)
    }

    return <Formik { ...formik }>
        <Form>
            <Flex direction="column" gap={ "md" } mt='lg'>
                <FormInput
                    name='name'
                    label="Имя"
                    placeholder="Имя"
                />
                <TextInput
                    value={ user!.email }
                    label="Email"
                    placeholder="Email"
                    disabled
                />
                {
                    user!.role == 'user' && <FormNumberInput
                        name='age'
                        label="Возраст"
                        placeholder="Возраст"
                    />
                }
                <Select
                    label="Город"
                    placeholder="Город"
                    searchable
                    nothingFoundMessage='Не выбран'
                    data={ cities }
                    value={ city }
                    onChange={ setCity }
                />
                {
                    user!.role == 'user' && <FormNumberInput
                        name='workExp'
                        label="Стаж работы (лет)"
                        placeholder="Стаж работы"
                    />
                }

                <Flex gap='md'>
                    <Button
                        type='submit'
                        w={ "fit-content" }>
                        Сохранить
                    </Button>
                    <Button color='red' onClick={ logout }>
                        Выйти из аккаунта
                    </Button>
                </Flex>
            </Flex>
        </Form>
    </Formik>
}