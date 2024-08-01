import { create } from "zustand";
import { IUser } from "@/models/IUser.ts";

interface UserState {
    user: IUser | null,
    setUser: (user: IUser | null) => void,
}

const useUserStore = create<UserState>()((set) => ({
    user: null,
    setUser: (user) => set((state) => ({...state, user}))
}))

export default useUserStore