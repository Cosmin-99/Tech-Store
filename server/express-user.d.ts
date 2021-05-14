declare namespace Express {
    export interface Request {
        user: User;
    }

    export interface User {
            firstName: string,
            lastName: string,
            email: string,
            role: string
    }
}