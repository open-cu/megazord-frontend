import { Flex, Text, Textarea, TextInput, UnstyledButton } from "@mantine/core";
import styles from "@/pages/change-team/change-team.module.css";
import { EditableVacancy } from "@/pages/change-team";
import { FC } from "react";
import {MultiSelectInput} from "@/components/multi-select-input";
import {skills} from "@/utils/skills";

type ChangeTeamVacancyProps = {
    vacancy: EditableVacancy
    onChange: (vacancy: EditableVacancy) => void
    onDelete: (vacancy: EditableVacancy) => void
}

export const ChangeTeamVacancy: FC<ChangeTeamVacancyProps> = (props) => {
    return (
        <Flex direction={ "column" } gap={ "xs" }>
            <TextInput
                label="Название вакансии"
                placeholder="Название вакансии"
                onChange={ e => {
                    props.onChange({
                        ...props.vacancy,
                        name: e.target.value,
                    })
                } }
                value={ props.vacancy.name }
            />

            <MultiSelectInput
                state={props.vacancy.keywords}
                setState={(keywords) => {
                    props.onChange({
                        ...props.vacancy,
                        keywords: keywords,
                    })
                }}
                data={skills}
            />
            <UnstyledButton onClick={ () => props.onDelete(props.vacancy) }>
                <Text
                    size="sm"
                    className={ styles.delete_btn }>
                    Удалить вакансию
                </Text>
            </UnstyledButton>
        </Flex>
    )
}