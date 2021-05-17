export interface User {
    id: number;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    adresses?: string;
    cards?: string;
    cart?: string;
    favorites?: number[]
    token: string;
    role: "user" | "admin" | "provider";
}