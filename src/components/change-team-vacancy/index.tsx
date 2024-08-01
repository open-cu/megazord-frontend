import { Flex, Text, Textarea, TextInput, UnstyledButton } from "@mantine/core";
import styles from "@/pages/change-team/change-team.module.css";
import { EditableVacancy } from "@/pages/change-team";
import { FC } from "react";

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
            <Textarea
                label="Ключевые слова"
                placeholder="Ключевые слова (Например: Go, Postgres, Docker)"
                onChange={ e => {
                    props.onChange({
                        ...props.vacancy,
                        keywords: e.target.value,
                    })
                } }
                value={ props.vacancy.keywords }
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