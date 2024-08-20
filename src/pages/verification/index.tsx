import { Anchor, Button, UnstyledButton, Center, Flex, Text } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import {useVerificationForm} from "@/hooks/use-verification-form";
import {FormPinInput} from "@/components/form-input/form-pin-input";
import {useEffect, useState} from "react";
import {toast} from "@/utils/toasts";
import resendCode from "@/api/resend-code";

export const Verification = () => {
    const params = useParams();
    const email = decodeURIComponent(params.email)
    const {formik} = useVerificationForm(email)

    const [timeLeft, setTimeLeft] = useState(120);

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);

            return () => clearInterval(timerId);
        }
    }, [timeLeft]);

    const handleResendClick = async () => {
        resendCode(email).then(res => {
            if(res) toast({
                type: "success",
                message: "Код отправлен повторно"
            })
            else toast({
                type: "error",
                message: "Ошибка при повторной отправке кода"
            })
        })
        setTimeLeft(120);
    };
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
            <UnstyledButton
                my={8}
                onClick={handleResendClick}
                disabled={timeLeft > 0}
                fz={"sm"}
                c={timeLeft > 0 ? "grey" : "blue"}
            >
                {timeLeft > 0
                    ? `Отправить код повторно через ${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`
                    : "Отправить код повторно"}
            </UnstyledButton>
            <Link to={ "/sign-up/user" }>
                <Anchor size={ "sm" } fz={"md"}>
                    Вернуться
                </Anchor>
            </Link>
        </Flex>
    )
}