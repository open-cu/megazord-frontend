import { Anchor, Button, Center, Flex, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import {useVerificationForm} from "@/hooks/use-verification-form";
import {FormPinInput} from "@/components/form-input/form-pin-input";

export const Verification = () => {
    const {formik} = useVerificationForm()
    return (
        <Flex component={ Center } h={ "100vh" } direction={ "column" }>
            <h1 style={{ textAlign: 'center' }}>Верификация</h1>
            <Text size={'xs'} ta={"center"} c="dimmed" px={"sm"}>Код был отправлен на вашу почту, введите его для подтверждения</Text>
            <Formik { ...formik }>
                <Form>
                    <Flex w={ "300px" } direction={ "column" } align={"center"}>
                        <FormPinInput
                            my='md'
                            name='code'
                            size='md'
                            length={6}
                        />
                        <Button type="submit" size="sm">Подтвердить</Button>
                    </Flex>
                </Form>
            </Formik>
            <Link to={ "/sign-up/user" }>
                <Anchor size={ "sm" } mt={ 8 }>
                    Вернуться
                </Anchor>
            </Link>
        </Flex>
    )
}