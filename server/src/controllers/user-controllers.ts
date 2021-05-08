import { Request, Response, NextFunction } from "express";
import { QueryResult } from "pg";
import { pool } from "../database/database";
import { ApiError } from "../error/ApiError";
import { HttpStatusCode } from "../error/HttpStatusCodes";
import { CurrentUser } from "../models/user.model";

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {

        const {firstname, lastname} = req.body;
        const email = (req.user as CurrentUser).email;
        console.log("H1")
        const updateUserFields: QueryResult = await pool.query('UPDATE Users SET "firstname"=$1, "lastname"=$2 WHERE email = $3',
        [firstname, lastname, email])

        console.log(req.user);

        return res.status(200).json({
            message: "User updated succesfully !!!"
        });

    } catch(err) {
        next(new ApiError(HttpStatusCode.BadRequest, err));
    }
}