import {Header} from "@/components/header";
import {Anchor, Button, Container, Flex, Select, TextInput} from "@mantine/core";
import {AuthGuard} from "@/components/auth-guard";
import {createFormik} from "@/utils/create-formik.ts";
import useUser from "@/hooks/use-user.ts";
import {Form, Formik} from "formik";
import {FormInput} from "@/components/form-input/form-input.tsx";
import {FormNumberInput} from "@/components/form-input/form-number-input.tsx";
import updateProfile from "@/api/update-profile.ts";
import {cities} from "@/utils/cities.ts"
import {useEffect, useState} from "react";
import * as yup from 'yup';
import {Link, useNavigate} from "react-router-dom";
import {toast} from "@/utils/toasts";
import getTelegramLink from "@/api/get-telegram-link";

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
    const [tgLink, setTgLink] = useState<null | string>(null);

    useEffect(() => {
        getTelegramLink().then(setTgLink)
    }, [])

    const formik = createFormik({
        initialValues: {
            name: user!.name,
            age: user!.age ? user!.age!.toString() : '',
            workExp: user!.workExp ? user!.workExp!.toString() : '',
        },
        validationSchema: yup.object({
            name: yup.string().required('Введите имя').max(30, 'Имя слишком длинное').matches(/^[^,]*$/, 'Поле не должно содержать запятые'),
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
                toast({
                    type: "success",
                    message: "Изменения сохранены"
                })
                setUser({
                    ...user,
                    name: values.name,
                    age: parseInt(values.age) ?? user.age,
                    city: city ?? user.city,
                    workExp: parseInt(values.workExp) ?? user.workExp,
                })
            } else {
                toast({
                    type: "error",
                    message: "Произошла ошибка при обновлении профиля"
                })
            }
        }
    })

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user_id')
        setUser(null)
        toast({
            type: "success",
            message: "Вы успешно вышли из аккаунта"
        })
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
                {tgLink && <Link to={tgLink} target="_blank">
                    <Anchor fz={"sm"}>Переходи в телеграм бота, чтобы оперативно получать уведомления</Anchor>
                </Link>}
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