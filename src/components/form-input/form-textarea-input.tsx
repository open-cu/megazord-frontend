import { FC, memo } from "react";
import { Textarea, TextareaProps } from "@mantine/core";
import { useField, useFormikContext } from "formik";

export type FormInputProps = {
    name: string
    placeholder?: string;
} & TextareaProps

export const FormTextareaInput: FC<FormInputProps> = memo(props => {
    const [field, meta] = useField(props.name);
    const {isSubmitting} = useFormikContext()

    const error = !!meta.error && meta.touched ? meta.error : undefined

    return <Textarea { ...field } disabled={ isSubmitting } error={ error } { ...props } />
})