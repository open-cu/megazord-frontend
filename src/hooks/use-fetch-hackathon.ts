import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {IHackathon} from "@/models/IHackathon";
import fetchHackathon from "@/api/fetch-hackathon";
import {route404} from "@/utils/constants";

function assertNonNull<T>(val: T | null | undefined, errorMessage: string = 'Required value is null'): asserts val is T {
    if (val == null) {
        throw new Error(errorMessage);
    }
}

export const useFetchHackathon = (hackathon_id: string) => {
    const [hackathon, setHackathon] = useState<IHackathon | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadHackathon = async () => {
            try {
                const id = hackathon_id ?? '';

                const data = await fetchHackathon(id);
                assertNonNull(data, 'Hackathon not found');

                setHackathon(data);
            } catch (e) {
                navigate(route404);
            }
        };

        loadHackathon();
    }, [hackathon_id, navigate]);

    return [hackathon, setHackathon] as const;
};
