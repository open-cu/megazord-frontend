import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function useQueryState(queryParam: string): [string, (newValue: string) => void] {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const [state, setState] = useState<string>(queryParams.get(queryParam) || '');

    useEffect(() => {
        const handleStateChange = (newState: string | null) => {
            const searchParams = new URLSearchParams(location.search);
            if (newState) {
                searchParams.set(queryParam, newState);
            } else {
                searchParams.delete(queryParam);
            }
            const newSearch = searchParams.toString();
            navigate(`?${ newSearch }`, {replace: true});
        };

        handleStateChange(state);
    }, [state, queryParam, location.search, navigate]);

    const updateState = (newValue: string) => {
        setState(newValue);
    };

    return [state, updateState];
}
