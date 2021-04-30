import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { QueryResult } from "pg";
import { pool } from "../database/database";
import jwt from "jsonwebtoken";
import { ApiError } from "../error/ApiError";
import { HttpStatusCode } from "../error/HttpStatusCodes";

export const providerRegister = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { firstName, lastName, email, password, companyName, address } = req.body;
        const user: QueryResult = await pool.query("SELECT * FROM Users WHERE email LIKE $1", [email]);

        if (!user.rows.length) {
            const hashedPassword = await bcrypt.hash(password, 12);
            const role = "provider";
            const response: QueryResult = await pool.query(`
        INSERT INTO Users ("firstname", "lastname", "email", "role", "password") VALUES ($1, $2, $3, $4, $5)
        `,
                [
                    firstName,
                    lastName,
                    email,
                    role,
                    hashedPassword
                ]);

            const provider: QueryResult = await pool.query(`
            INSERT INTO Providers ("firstname", "lastname", "companyname", "address", "email") VALUES ($1, $2, $3, $4, $5)
            `, [
                firstName,
                lastName,
                companyName,
                address,
                email
            ])

            const token = jwt.sign({
                firstName: firstName,
                lastName: lastName,
                email: email,
                role: role
            },
                process.env.TOKEN_ENCRYPTION as string,
            );

            return res.status(200).json({
                firstName: firstName,
                lastName: lastName,
                email: email,
                role: role,
                token
            })
        } else if (user.rows[0].email === email) {
            next(new ApiError(HttpStatusCode.BadRequest, "This email already exist in database !!!"));
        } else {
            next(new ApiError(HttpStatusCode.BadRequest, "Something went wrong when you try to register. Please try again !!!"));
        }

    } catch (err) {
        next(new ApiError(HttpStatusCode.BadRequest, "Something went wrong when you try to register. Please try again !!!"));
    }
}