import { Request, Response, NextFunction } from "express";
import { QueryResult } from "pg";
import { pool } from "../database/database";
import { ApiError } from "../error/ApiError";
import { HttpStatusCode } from "../error/HttpStatusCodes";
import { CurrentUser } from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as yup from 'yup';
import Mail from "nodemailer/lib/mailer";
import nodemailer from "nodemailer";

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {

        const { firstname, lastname, adresses, cards, cart, favorites } = req.body;
        const email = (req.user as CurrentUser).email;
        const updateUserFields: QueryResult = await pool.query('UPDATE Users SET "firstname"=$1, "lastname"=$2,"adresses"=$3,"cards"=$4, "cart"=$5, "favorites"=$6 WHERE email = $7 RETURNING *',
            [firstname, lastname, adresses, cards, cart, favorites, email])
        return res.status(200).json(updateUserFields.rows[0]);

    } catch (err) {
        next(new ApiError(HttpStatusCode.BadRequest, err));
    }
}
export const getCurrentSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = (req.user as CurrentUser).email;
        const response = await pool.query(`SELECT * from users where email = $1`, [email]);
        const token = jwt.sign(response.rows[0],
            process.env.TOKEN_ENCRYPTION as string)
        return res.status(200).json({
            ...response.rows[0],
            token
        })
    } catch (err) {
        next(err);
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const id: number = parseInt(req.params.id);
        const response: QueryResult = await pool.query("DELETE FROM users WHERE id = $1", [id]);

        return res.status(200).json({
            message: "User removed."
        })

    } catch (err) {
        next(new ApiError(HttpStatusCode.BadRequest, err));
    }
}

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const response: QueryResult = await pool.query(`SELECT 
            CAST(users.id as INTEGER),
            users.firstname,
            users.lastname,
            users.email,
            users.role,
            users.password,
            users.adresses,
            users.cards,
            users.cart FROM users`);

        return res.status(200).json(response.rows);
    } catch (err) {
        next(new ApiError(HttpStatusCode.BadRequest, err));
    }
}

export const createUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const schema = yup.object().shape({
            firstName: yup.string().required("First Name is Required"),
            lastName: yup.string().required("Last Name is Required"),
            email: yup.string().email("Invalid Email").required("Email is Required"),
            // password: yup.string().min(3).required("Password is Required"),
        });
        const { firstName, lastName, email, role, password } = req.body;

        await schema.validate({
            firstName, lastName, email, password
        })
        // if this passes it means that the schema is valid , otherwise the error will be catched down

        const user: QueryResult = await pool.query("SELECT * FROM Users WHERE email LIKE $1", [email]);

        if (!user.rows.length) {
            const hashedPassword = await bcrypt.hash("1234", 12);

            const user = await pool.query(`
        INSERT INTO Users ("firstname", "lastname", "email", "role", "password") VALUES ($1, $2, $3, $4, $5)
        `,
                [
                    firstName,
                    lastName,
                    email,
                    role,
                    hashedPassword
                ]);

            const resetPasswordRequest = await pool.query(` 
    INSERT INTO ResetPassword ("firstname", "lastname", "email") VALUES ($1, $2, $3)
    `,
                [
                    firstName,
                    lastName,
                    email
                ]);

            const token = jwt.sign({
                firstName: firstName,
                lastName: lastName,
                email: email,
                role: role
            },
                process.env.TOKEN_ENCRYPTION as string,
            );

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD
                },
                debug: false,
                logger: true
            })

            // <a href="localhost:3000/reset-password/${token}">Click Here</a>
            // <p>Click the follow link to reset your password . <a href="localhost:3000/reset-password/${token}">Click Here</a> to reset your password \n This URL is avaliable 24hrs and can be accessed only once !!!</p>
            //send email with defined transport object
            const info: Promise<Mail> = await transporter.sendMail({
                from: '"Tech Store support team" <support@techstore.com>',
                to: email,
                subject: "Reset Password",
                text: "Click the follow link to reset your password . This URL is avaliable 24hrs and can be accessed only once !!!",
                html: `<p>Click the follow link to reset your password . <a href="http://localhost:3000/reset-password/${token}">Click Here</a> to reset your password \n This URL is avaliable 24hrs and can be accessed only once !!!</p>`
            })

            return res.status(200).json({
                firstName: firstName,
                lastName: lastName,
                email: email,
                role: role,
                token
            })
        } else if (user.rows[0].email === email) {
            next(new ApiError(HttpStatusCode.BadRequest, "Email already exists"));
        } else {
            next(new ApiError(HttpStatusCode.InternalServerError, "Something went wrong when you try to register. Please try again"));
        }

    } catch (err) {
        console.log(err);
        if (err instanceof yup.ValidationError) {
            next(err.errors[0]);
        } else {
            next(err);
        }
    }
}