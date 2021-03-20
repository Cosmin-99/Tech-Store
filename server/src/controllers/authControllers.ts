import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { QueryResult } from "pg";
import { pool } from "../database/database";
import jwt from "jsonwebtoken";

export const userRegister = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const user: QueryResult = await pool.query("SELECT * FROM Users WHERE email LIKE $1", [email]);

        if (!user.rows.length) {
            const hashedPassword = await bcrypt.hash(password, 12);
            const response: QueryResult = await pool.query(`
        INSERT INTO Users ("firstName", "lastName", "email", "password") VALUES ($1, $2, $3, $4)
        `,
                [
                    firstName,
                    lastName,
                    email,
                    hashedPassword
                ]);

            const token = jwt.sign({
                firstName: firstName,
                lastName: lastName,
                email: email
            },
                process.env.TOKEN_ENCRYPTION as string,
            );

            return res.status(200).json({
                firstName: firstName,
                lastName: lastName,
                email: email,
                token
            })
        } else if (user.rows[0].email === email) {
            return res.status(404).json({
                message: "This email already exists in database !!!"
            })
        } else {
            return res.status(404).json({ message: "Something went wrong when you try to register. Please try again !!!" })
        }

    } catch (err) {
        return res.status(404).json({ message: "Something went wrong when you try to register. Please try again !!!" })
    }
}

export const userLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const response = await pool.query("SELECT * FROM Users WHERE email LIKE $1", [email]);

        if (!response) {
            return res.status(401).json({
                message: "Invalid credentials, couldn,t log you in !!!"
            })
        }

        const isValidPassword = await bcrypt.compare(password, response.rows[0].password);

        if (!isValidPassword) {
            return res.status(401).json({
                message: "Invalid credentials, couldn't log you in !!!"
            })
        }

        const token = jwt.sign({
            firstName: response.rows[0].firstName,
            email: response.rows[0].email
        },
            process.env.TOKEN_ENCRYPTION as string)


        return res.status(200).json({
            firstName: response.rows[0].firstName,
            lastName: response.rows[0].lastName,
            email: response.rows[0].email,
            token
        })

    } catch (err) {
        return res.status(500).json({
            message: "Logging in failed!"
        })
    }
}