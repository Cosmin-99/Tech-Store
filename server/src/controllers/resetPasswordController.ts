import { Request, Response } from "express";
import { QueryResult } from "pg";
import { pool } from "../database/database";
import bcrypt from "bcryptjs";
import { decrypt } from "../utils/utilsFunctions";

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const key = req.params.urlKey;
        const userEmail = decrypt(process.env.TOKEN_ENCRYPTION as string, key);
        const resetPasswordRequest = await pool.query("SELECT * FROM ResetPassword WHERE email LIKE $1", [userEmail]);

        if (resetPasswordRequest.rows.length) {
            const { newpassword } = req.body;
            const newHashedPasword = await bcrypt.hash(newpassword, 12);

            const updatedUser: QueryResult = await pool.query('UPDATE Users SET "password" = $1 WHERE email = $2', [newHashedPasword, userEmail]);
            const deleteRequest: QueryResult = await pool.query('DELETE FROM ResetPassword WHERE email = $1', [userEmail]);

            return res.status(200).json({
                message: "New password has been updated !!!"
            })
        } else {
            res.status(401).json({
                message: "This URL it was already used once or no password reset request has been registered !!!"
            })
        }
    } catch (err) {
        res.status(400).json(err)
    }
}