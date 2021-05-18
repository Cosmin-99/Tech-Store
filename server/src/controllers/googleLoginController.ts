import { Response, Request } from 'express'
import { pool } from '../database/database'
import { LoginTicket, OAuth2Client, TokenPayload } from 'google-auth-library';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { QueryResult } from 'pg';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { tokenId } = req.body; //will take from body, the tokenId

        const response: LoginTicket = await client.verifyIdToken({ idToken: tokenId, audience: process.env.GOOGLE_CLIENT_ID }) //verify token
        const { email_verified, given_name, family_name, email } = response.getPayload() as TokenPayload; //destructure data from payload

        if (email_verified) {// if email is verified
            const user = await pool.query("SELECT * FROM Users WHERE email LIKE $1", [email]); //I'm looking for the user in the database 

            if (user.rows.length) {// if he is already in database
                const token = jwt.sign(user.rows[0],
                    process.env.TOKEN_ENCRYPTION as string)

                return res.status(200).json({
                    ...user.rows[0],
                    token
                })

            } else {// if is not into the database, will create credentials for that user
                const firstName = family_name;
                const lastName = given_name;
                const password = email as string + process.env.TOKEN_ENCRYPTION as string;
                const hashedPassword = await bcrypt.hash(password, 12);
                const role = "user"
                console.log(password);
                console.log(hashedPassword);

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
        } else {
            return res.status(404).json({
                message: "Email is not verified, something went wrong .... !!!"
            })
        }
    } catch (err) {
        console.log(err)
        return res.status(404).json(err);
    }

}