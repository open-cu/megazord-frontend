import { jwtDecode } from "jwt-decode";

export default function parseJwt(token: string, field: string): string | undefined  {
    try {
        return (jwtDecode(token) as any)[field];
    } catch (e) {
        console.error(e)
    }
}