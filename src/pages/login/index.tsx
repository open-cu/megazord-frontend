import {Anchor, Button, Center, Flex} from "@mantine/core";
import {IconAt} from "@tabler/icons-react";
import {Link, useNavigate} from "react-router-dom";
import {createFormik} from "@/utils/create-formik.ts";
import login from "@/api/login.ts";
import parseJwt from "@/utils/parse-jwt.ts";
import {Form, Formik} from "formik";
import {FormInput} from "@/components/form-input/form-input.tsx";
import {FormPasswordInput} from "@/components/form-input/form-password-input.tsx";
import {toast} from "@/utils/toasts";
import {SwitchThemeBtn} from "@/components/switch-theme-btn";

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
                formikHelpers.setFieldError('email', 'Не найден аккаунт с таким email и/или паролем')
                toast({
                    type: "error",
                    message: "Не найден аккаунт с таким email и/или паролем"
                })
                return
            }

            if (!response) {
                formikHelpers.setFieldError('email', 'Не найден аккаунт с таким email и/или паролем')
                toast({
                    type: "error",
                    message: "Не найден аккаунт с таким email и/или паролем"
                })
                return
            }

            const userId = parseJwt(response, 'user_id')
            if (userId) {
                localStorage.setItem('auth_token', response)
                localStorage.setItem('user_id', userId)
                navigate('/')
                toast({
                    type: "success",
                    message: "Вы успешно вошли в аккаунт"
                })
            }
        }
    })

    return (
        <Flex component={ Center } h={"100vh"} direction={ "column" } style={{ position: "relative" }}>
            <SwitchThemeBtn style={{ position: "absolute", bottom: "5%", right: "5%" }} size={"lg"} />
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