import {MultiSelect, Text, UnstyledButton} from "@mantine/core";
import {useState} from "react";

interface Props {
    state: string,
    setState: (string) => void,
    data: string[],
}

export const MultiSelectInput = ({ state, setState, data }: Props) => {
    const [list, setList] = useState<string[]>(state.split(', ').filter(el => el != ""));
    const [searchValue, setSearchValue] = useState("");

    return (
        <MultiSelect
            label="Ключевые слова"
            placeholder="Ключевые слова (Например: Go, Postgres, Docker)"
            data={data}
            searchable

            value={list}
            onChange={e => {
                setList(e)
                setState(e.join(', '))
            }}

            searchValue={searchValue}
            onSearchChange={setSearchValue}
            hidePickedOptions

            nothingFoundMessage={<UnstyledButton onClick={() => {
                list.push(searchValue)
                setState(state+searchValue)
                setSearchValue("")
            }}><Text size={"sm"} c={"blue"}>Добавить {searchValue}</Text></UnstyledButton>}
        />
    );
};