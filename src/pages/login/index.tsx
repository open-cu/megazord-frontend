import { Anchor, Button, Center, Flex } from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { createFormik } from "@/utils/create-formik.ts";
import login from "@/api/login.ts";
import parseJwt from "@/utils/parse-jwt.ts";
import { Form, Formik } from "formik";
import { FormInput } from "@/components/form-input/form-input.tsx";
import { FormPasswordInput } from "@/components/form-input/form-password-input.tsx";

export const Login = () => {
    const navigate = useNavigate()

    const formik = createFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values, formikHelpers) => {
            const response = await login(values)

            if (response == 'invalid-credentials') {
                formikHelpers.setFieldError('email', 'Неверный email или пароль')
                return
            }

            if (!response) {
                formikHelpers.setFieldError('email', 'Произошла непредвиденная ошибка')
                return
            }

            const userId = parseJwt(response, 'user_id')
            if (userId) {
                localStorage.setItem('auth_token', response)
                localStorage.setItem('user_id', userId)
                navigate('/')
            }
        }
    })

    return (
        <Flex component={ Center } h={ "100vh" } direction={ "column" }>
            <h1 style={ {textAlign: 'center'} }>Вход</h1>
            <Formik { ...formik }>
                <Form>
                    <Flex w={ "300px" } direction={ "column" } gap={ "xs" } mt='sm'>
                        <FormInput
                            name='email'
                            size="md"
                            placeholder={ "Email" }
                            rightSection={ <IconAt stroke={ 2 } size={ 16 }/> }
                        />
                        <FormPasswordInput
                            name='password'
                            size="md"
                            placeholder={ "Пароль" }
                        />
                        <Button type='submit' size="md">Войти в аккаунт</Button>
                    </Flex>
                </Form>
            </Formik>

            <Link to={ "/sign-up/user" }>
                <Anchor size={ "xs" }>
                    Нет аккаунта? Создать
                </Anchor>
            </Link>
        </Flex>
    )
}