import { User } from "../models/User"

export const userRegister = async (user: User) => {
    const response: Response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })

    return response.json()
}