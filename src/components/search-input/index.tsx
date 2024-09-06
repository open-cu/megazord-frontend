import {ChangeEvent, FC, memo} from "react";
import {Button, Flex, Input} from "@mantine/core";
import {IconSearch} from "@tabler/icons-react";
import useQueryState from "@/hooks/use-query-state";

export type SearchInputProps = {
    onChange: (query: string) => any;
    placeholder?: string;
}

export const SearchInput: FC<SearchInputProps> = memo(props => {
    const [query, setQuery] = useQueryState('q')
    
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        props.onChange(e.target.value)
    }

    return <Input
        flex="max-content"
        value={ query }
        placeholder={ props.placeholder }
        onChange={ onChange }
        size="md"
    />
})