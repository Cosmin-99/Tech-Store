import { Request, Response } from "express";
import fetch from "node-fetch";
import { QueryResult } from "pg";
import { pool } from "../database/database";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const facebookLogin = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { userID, accessToken } = req.body;

        const urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`
        const response = await fetch(urlGraphFacebook, {
            method: "GET"
        });

        const data = await response.json()

        const { email, name } = data;
        const user: QueryResult = await pool.query("SELECT * FROM Users WHERE email LIKE $1", [email]);
        if (user.rows.length) {// if he is already in database
            const token = jwt.sign({// create a login token
                email: user.rows[0].email,
                firstName: user.rows[0].firstname,
                lastName: user.rows[0].lastname
            },
                process.env.TOKEN_ENCRYPTION as string)

            return res.status(200).json({
                firstName: user.rows[0].firstname,
                lastName: user.rows[0].lastname,
                email: email,
                role: user.rows[0].role,
                token
            })
        } else {// if is not into the database, will create credentials for that user
            const lastName = name.substr(0, name.indexOf(" "));
            const firstName = name.substr(name.indexOf(" ") + 1);
            const password = email as string + process.env.TOKEN_ENCRYPTION as string;
            const hashedPassword = bcrypt.hash(password, 12);
            const role = "user"

            const newUser: QueryResult = await pool.query(`
    INSERT INTO Users ("firstname", "lastname", "email", "role", "password") VALUES ($1, $2, $3, $4, $5)
    `,
                [
                    firstName,
                    lastName,
                    email,
                    role,
                    hashedPassword
                ])

            const token = jwt.sign({
                firstName: firstName,
                lastName: lastName,
                email: email
            },
                process.env.TOKEN_ENCRYPTION as string,
            )

            return res.status(200).json({
                firstName: firstName,
                lastName: lastName,
                email: email,
                role: role,
                token
            })
        }
    } catch (err) {
        return res.status(400).json(err)
    }

}