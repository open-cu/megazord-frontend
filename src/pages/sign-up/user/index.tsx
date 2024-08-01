import { Anchor, Button, Center, Flex } from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useSignupForm } from "@/hooks/use-signup-form.ts";
import { Form, Formik } from "formik";
import { FormInput } from "@/components/form-input/form-input.tsx";
import { FormPasswordInput } from "@/components/form-input/form-password-input.tsx";

export const SignUpUser = () => {
    const {formik} = useSignupForm(false)

    return (
        <Flex component={ Center } h={ "100vh" } direction={ "column" }>
            <h1 style={{ textAlign: 'center' }}>Регистрация участника</h1>
            <Formik { ...formik }>
                <Form>
                    <Flex w={ "300px" } direction={ "column" } gap={ "xs" } mt='sm'>
                        <FormInput
                            name='name'
                            size='md'
                            placeholder={ "Имя" }
                        />
                        <FormInput
                            name='email'
                            size='md'
                            placeholder={ "Email" }
                            rightSection={ <IconAt stroke={ 2 } size={ 16 }/> }
                        />
                        <FormPasswordInput
                            name='password'
                            size='md'
                            placeholder={ "Пароль" }
                        />
                        <FormPasswordInput
                            name='passwordConfirm'
                            size='md'
                            placeholder={ "Подтвердите пароль" }
                        />
                        <Button type="submit" size="md">Создать аккаунт</Button>
                    </Flex>
                </Form>
            </Formik>
            <Link to={ "/sign-up/org" }>
                <Anchor size={ "xs" } mt={ 8 }>
                    Зарегистрироваться как организация
                </Anchor>
            </Link>
            <Link to={ "/login" }>
                <Anchor size={ "xs" } mt={ 8 }>
                    Есть аккаунт? Войти
                </Anchor>
            </Link>
        </Flex>
    )
}