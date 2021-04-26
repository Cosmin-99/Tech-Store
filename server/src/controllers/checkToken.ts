import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const tokenVerification = (req: Request, res: Response): Response => {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        return res.json({
            passed: false
        })
    }

    jwt.verify(token, process.env.TOKEN_ENCRYPTION as string, (err, user) => {
        if (err) {
            return res.json({
                passed: false
            })
        }
    })

    return res.json({
        passed: true
    })
}