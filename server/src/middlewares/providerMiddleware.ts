import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface User {
    firstName: string,
    lastName: string,
    email: string,
    role: string
}

export function providerMiddleWare(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.TOKEN_ENCRYPTION as string, (err: any, user: any) => {
        if (err) return res.sendStatus(403)
        console.log(err)
        req.user = user as User;
        console.log(user);
        if (user.role === "provider" || user.role === "admin" /** an admin should always be able to run this */) {
            next()
        } else {
            return res.sendStatus(401)
        }
    })
}