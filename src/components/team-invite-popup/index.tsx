import { FC, memo } from "react";
import { Button, Flex, Modal } from "@mantine/core";
import { createFormik } from "@/utils/create-formik.ts";
import * as yup from 'yup';
import { Form, Formik } from "formik";
import { FormInput } from "@/components/form-input/form-input.tsx";
import sendTeamInviteEmail from "@/api/send-team-invite-email";

export type TeamInvitePopupProps = {
    team_id: number
    opened: boolean
    close: () => void
    onClose: () => void
}

export const TeamInvitePopup: FC<TeamInvitePopupProps> = memo(props => {

    const formik = createFormik({
        initialValues: {
            email: '',
            vacancy: null,
        },
        validationSchema: yup.object({
            email: yup.string().required('Введите email').email('Неверный email')
        }),
        onSubmit: (values) => {
            sendTeamInviteEmail(props.team_id, { "email": values.email })
            props.close()
        },
    })
    
    return <Modal opened={ props.opened } onClose={ props.onClose } title="Пригласить в команду" centered>
        <Formik {...formik}>
            <Form>
                <Flex direction='column' gap={12}>
                    <FormInput name='email' size='md' placeholder="Введите email участника"/>
                    <Button type="submit">Отправить приглашение</Button>
                </Flex>
            </Form>
        </Formik>
    </Modal>
})