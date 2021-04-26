import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { QueryResult } from "pg";
import { pool } from "../database/database";
import jwt from "jsonwebtoken";
import { ApiError } from "../error/ApiError";
import { HttpStatusCode } from "../error/HttpStatusCodes";

export const userRegister = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const user: QueryResult = await pool.query("SELECT * FROM Users WHERE email LIKE $1", [email]);

        if (!user.rows.length) {
            const hashedPassword = await bcrypt.hash(password, 12);
            const role = "user";
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
            return res.status(400).json({
                message: "This email already exists in database !!!"
            })
        } else {
            return res.status(400).json({ message: "Something went wrong when you try to register. Please try again !!!" })
        }

    } catch (err) {
        return res.status(400).json({ message: "Something went wrong when you try to register. Please try again !!!" })
    }
}

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        if (!password) {
            next(new ApiError(HttpStatusCode.BadRequest, "Missing Password"));
            return;
        }
        if (!email) {
            next(new ApiError(HttpStatusCode.BadRequest, "Missing Email"));
            return;

        }
        const response = await pool.query("SELECT * FROM Users WHERE email = $1", [email]);
        if (!response || response.rowCount === 0) {
            next(new ApiError(HttpStatusCode.BadRequest, "Invalid Credentials"));
            return;
        }

        const isValidPassword = await bcrypt.compare(password, response.rows[0].password);

        if (!isValidPassword) {
            next(new ApiError(HttpStatusCode.BadGateway, "Invalid username of password"))
            return;
        }
        const token = jwt.sign({
            firstName: response.rows[0].firstname,
            email: response.rows[0].email
        },
            process.env.TOKEN_ENCRYPTION as string)

        return res.status(200).json({
            firstName: response.rows[0].firstname,
            lastName: response.rows[0].lastname,
            email: response.rows[0].email,
            role: response.rows[0].role,
            token
        })

    } catch (err) {
        console.log(err);
        next(err);
        return;
    }
}
