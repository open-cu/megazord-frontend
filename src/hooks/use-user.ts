import { useNavigate } from "react-router-dom";
import useUserStore from "@/stores/user-store.ts";
import { useEffect, useState } from "react";
import fetchMe from "@/api/fetch-me.ts";

export default function useUser(forceAuthPush = true) {
    const navigate = useNavigate()
    const user = useUserStore(state => state.user)
    const setUser = useUserStore(state => state.setUser)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!localStorage.getItem('user_id') || !localStorage.getItem('auth_token')) {
            localStorage.removeItem('user_id')
            localStorage.removeItem('auth_token')
            if (forceAuthPush) navigate('/login')
            setLoading(false)
            return;
        }

        if (user == null) {
            fetchMe().then(user => {
                if (user) {
                    setUser(user)
                } else {
                    localStorage.removeItem('user_id')
                    localStorage.removeItem('auth_token')
                    if (forceAuthPush) navigate('/login')
                }
                setLoading(false)
            })
        } else {
            setLoading(false)
        }
    }, [user])

    return {user, loading, setUser}
}