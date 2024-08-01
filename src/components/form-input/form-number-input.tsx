import { FC, memo } from "react";
import { TextInput, TextInputProps } from "@mantine/core";
import { useField, useFormikContext } from "formik";

export type FormNumberInputProps = {
    name: string
    placeholder?: string;
} & TextInputProps

export const FormNumberInput: FC<FormNumberInputProps> = memo(props => {
    const [field, meta] = useField(props.name);
    const {isSubmitting} = useFormikContext()

    const error = !!meta.error && meta.touched ? meta.error : undefined

    return <TextInput
        type='number'
        disabled={ isSubmitting }
        error={ error }
        { ...props }
        { ...field }/>
})