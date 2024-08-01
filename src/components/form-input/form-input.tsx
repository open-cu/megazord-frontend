import { FC, memo } from "react";
import { TextInput, TextInputProps } from "@mantine/core";
import { useField, useFormikContext } from "formik";

export type FormInputProps = {
    name: string
    placeholder?: string;
} & TextInputProps

export const FormInput: FC<FormInputProps> = memo(props => {
    const [field, meta] = useField(props.name);
    const {isSubmitting} = useFormikContext()

    const error = !!meta.error && meta.touched ? meta.error : undefined

    return <TextInput { ...field } disabled={ isSubmitting } error={ error } { ...props } />
})