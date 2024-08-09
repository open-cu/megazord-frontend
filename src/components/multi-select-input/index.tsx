import {UnstyledButton, MultiSelect, Text} from "@mantine/core";
import {useEffect, useState} from "react";

interface Props {
    data: string[],
}

export const MultiSelectInput = ({ data }: Props) => {
    const [state, setState] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    useEffect(() => console.log(state), [state])
    return (
        <MultiSelect
            label="Your favorite libraries"
            placeholder="Pick value"
            data={data}
            searchable

            value={state}
            onChange={setState}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            hidePickedOptions

            nothingFoundMessage={<UnstyledButton onClick={() => {
                state.push(searchValue)
                setSearchValue("")
            }}><Text size={"sm"} c={"blue"}>Добавить {searchValue}</Text></UnstyledButton>}
        />
    );
};