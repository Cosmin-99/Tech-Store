import { Request, Response, NextFunction } from "express";
import { QueryResult } from "pg";
import { pool } from "../database/database";
import { ApiError } from "../error/ApiError";
import { HttpStatusCode } from "../error/HttpStatusCodes";
import { CurrentUser } from "../models/user.model";
import jwt from "jsonwebtoken";

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {

        const { firstname, lastname, adresses, cards } = req.body;
        const email = (req.user as CurrentUser).email;
        console.log("H1")
        const updateUserFields: QueryResult = await pool.query('UPDATE Users SET "firstname"=$1, "lastname"=$2,"adresses"=$3,"cards"=$4 WHERE email = $5',
            [firstname, lastname, adresses, cards, email])
        return res.status(200).json({
            message: "User updated succesfully !!!"
        });

    } catch (err) {
        next(new ApiError(HttpStatusCode.BadRequest, err));
    }
}
export const getCurrentSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = (req.user as CurrentUser).email;
        const response = await pool.query(`SELECT * from users where email = $1`, [email]);
        const token = jwt.sign({
            firstName: response.rows[0].firstname,
            lastName: response.rows[0].lastname,
            email: response.rows[0].email,
            role: response.rows[0].role,
            adresses: response.rows[0].adresses,
            cards: response.rows[0].cards,
        },
            process.env.TOKEN_ENCRYPTION as string)
        return res.status(200).json({
            firstName: response.rows[0].firstname,
            lastName: response.rows[0].lastname,
            email: response.rows[0].email,
            role: response.rows[0].role,
            adresses: response.rows[0].adresses,
            cards: response.rows[0].cards,
            token
        })
    } catch (err) {
        next(err);
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
    try {
        const id: number = parseInt(req.params.id);
        const response: QueryResult = await pool.query("DELETE FROM users WHERE id = $1",[id]);

        return res.status(200).json({
            message: "User removed."
        })

    } catch(err) {
        next(new ApiError(HttpStatusCode.BadRequest, err));
    }
}

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
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