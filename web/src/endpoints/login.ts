
export const userLogin = async (email: string, password: string) => {
    const credentials = {
        email: email,
        password: password
    }

    const response: Response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    })

    return response.json()
}