import * as yup from 'yup';
import { createFormik } from "@/utils/create-formik.ts";
import signup from "@/api/signup.ts";
import { useNavigate } from "react-router-dom";
import login from "@/api/login.ts";
import parseJwt from "@/utils/parse-jwt.ts";

const validationSchema = yup.object({
    name: yup.string().required('Введите имя').max(60, 'Имя слишком длинное').matches(/^[^,]*$/, 'Поле не должно содержать запятые'),
    email: yup
        .string()
        .required('Введите email')
        .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Неверный email')
        .max(30, 'Email слишком длинный'),
    password: yup.string().required('Введите пароль').min(6, 'Пароль слишком простой').max(100, 'Пароль слишком длинный'),
    passwordConfirm: yup.string().required('Подтвердите пароль').oneOf([yup.ref('password')], 'Пароли должны совпадать')
})

export function useSignupForm(isOrganization: boolean) {
    const navigate = useNavigate()

    const formik = createFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, formikHelpers) => {
            const response = await signup(values, isOrganization);

            if (response == 'email-already-in-use') {
                formikHelpers.setFieldError('email', 'Этот email уже используется другим пользователем')
                return
            }

            if (!response) {
                formikHelpers.setFieldError('email', 'Произошла непредвиденная ошибка')
                return
            }
            navigate(`/verification/${encodeURIComponent(values.email)}`)
        }
    })

    return {
        formik
    }
}