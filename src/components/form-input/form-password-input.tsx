import { FC, memo } from "react";
import { PasswordInput, PasswordInputProps } from "@mantine/core";
import { useField, useFormikContext } from "formik";

export type FormPasswordInputProps = {
    name: string;
} & PasswordInputProps

export const FormPasswordInput: FC<FormPasswordInputProps> = memo(props => {
    const [field, meta] = useField(props.name);
    const {isSubmitting} = useFormikContext()

    const error = !!meta.error && meta.touched ? meta.error : undefined

    return <PasswordInput { ...field } disabled={ isSubmitting } error={ error } { ...props } />
})