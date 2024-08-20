import * as yup from 'yup';
import { createFormik } from "@/utils/create-formik.ts";
import signup from "@/api/signup.ts";
import { useNavigate } from "react-router-dom";
import login from "@/api/login.ts";
import parseJwt from "@/utils/parse-jwt.ts";
import {useEffect} from "react";
import activateAccount from "@/api/activate-account";
import {toast} from "@/utils/toasts";

const validationSchema = yup.object({
    code: yup.string().required('Введите код').min(6, 'Введите код полностью'),
})

export function useVerificationForm(email) {
    const navigate = useNavigate()

    const formik = createFormik({
        initialValues: {
            code: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, formikHelpers) => {
            const response = await activateAccount(email, values.code)
            if (!response) {
                formikHelpers.setFieldError('code', 'Неверный код')
                toast({
                    type: "error",
                    message: "Вы ввели неверный код"
                })
                return
            }
            toast({
                type: "success",
                message: "Вы успешно зарегестрировались"
            })
            navigate('/login')
        }
    })

    return {
        formik
    }
}