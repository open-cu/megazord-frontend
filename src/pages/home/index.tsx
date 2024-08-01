import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useUser from "@/hooks/use-user.ts";
import { Center, Loader } from "@mantine/core";

export const Home = () => {
    const navigate = useNavigate()
    const {user, loading} = useUser()

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login')
        }

        if (user?.role == 'user') {
            navigate('/hackathons/user')
        }

        if (user?.role == 'organizer') {
            navigate('/hackathons/org')
        }
    }, [user, loading])
    
    return <Center w='100vw' h='calc(100vh - 65px)'>
        <Loader size="md"/>
    </Center>
};