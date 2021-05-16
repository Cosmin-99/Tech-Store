export interface User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    adresses?: string;
    cards?: string;
    cart?: number[];
    token: string;
    role: "user" | "admin" | "provider";
}