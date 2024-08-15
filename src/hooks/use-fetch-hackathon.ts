import { useNavigate } from "react-router-dom"
import {useEffect, useState} from "react";
import {IHackathon} from "@/models/IHackathon";
import fetchHackathon from "@/api/fetch-hackathon";
import {route404} from "@/utils/constants";

export const useFetchHackathon = (hackathon_id: string) => {
    const [hackathon, setHackathon] = useState<IHackathon | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        const loadHackathon = async () => {
            try {
                const id = parseInt(hackathon_id ?? '', 10);
                if (id) {
                    const data = await fetchHackathon(id);
                    if (data) {
                        setHackathon(data);
                    } else {
                        navigate(route404);
                    }
                } else {
                    navigate(route404);
                }
            } catch {
                navigate(route404);
            }
        };

        loadHackathon();
    }, [hackathon_id, navigate, route404]);

    return [hackathon, setHackathon] as const;
};