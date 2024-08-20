import * as yup from 'yup';
import { createFormik } from "@/utils/create-formik.ts";
import signup from "@/api/signup.ts";
import { useNavigate } from "react-router-dom";
import login from "@/api/login.ts";
import parseJwt from "@/utils/parse-jwt.ts";
import {useEffect} from "react";

const validationSchema = yup.object({
    code: yup.string().required('Введите код').min(6, 'Введите код полностью'),
})

export function useVerificationForm() {
    const navigate = useNavigate()

    const formik = createFormik({
        initialValues: {
            code: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, formikHelpers) => {
            console.log(values)
            // const response = await signup(values, isOrganization);
            //
            // if (response == 'email-already-in-use') {
            //     formikHelpers.setFieldError('email', 'Этот email уже используется другим пользователем')
            //     return
            // }
            //
            // if (!response) {
            //     formikHelpers.setFieldError('email', 'Произошла непредвиденная ошибка')
            //     return
            // }
            //
            // const token = await login({
            //     email: values.email,
            //     password: values.password
            // })
            //
            // if (token == 'invalid-credentials' || !token) {
            //     formikHelpers.setFieldError('email', 'Произошла непредвиденная ошибка')
            //     return
            // }
            //
            // const userId = parseJwt(token, 'user_id')
            // if (userId) {
            //     localStorage.setItem('auth_token', token)
            //     localStorage.setItem('user_id', userId)
            //     navigate('/')
            // }
        }
    })

    return {
        formik
    }
}