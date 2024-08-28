import { FC, memo } from "react";
import {PinInput, PinInputProps} from "@mantine/core";
import { useField, useFormikContext } from "formik";

export type FormPinProps = {
    name: string
} & PinInputProps

export const FormPinInput: FC<FormPinProps> = memo((props) => {
    const [field, meta, helpers] = useField(props.name);
    const { isSubmitting } = useFormikContext();

    const error = !!meta.error && meta.touched ? meta.error : undefined;

    const handleChange = (value: string) => {
        helpers.setValue(value); // Обновление значения вручную
    };

    return (
        <PinInput
            {...props}
            value={field.value}
            onChange={handleChange}
            type="number"
            disabled={isSubmitting}
            error={error}
        />
    );
});