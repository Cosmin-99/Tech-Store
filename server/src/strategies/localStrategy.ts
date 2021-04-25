import passport from "passport";
import { Strategy } from "passport-local";
import { pool } from "../database/database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export function localStrategy() {
    passport.use(new Strategy({
        usernameField:"email",
        passwordField:"password"
    },async (email, password, done) => {
        const response = await pool.query("SELECT * FROM Users WHERE email LIKE $1", [email]);

        if (!response) {
            done(null, false);
        }
        const isValidPassword = await bcrypt.compare(password, response.rows[0].password);

        const token = jwt.sign({
            firstName: response.rows[0].firstname,
            email: response.rows[0].email
        },
            process.env.TOKEN_ENCRYPTION as string)
        
        if (!isValidPassword) {
            done(null, false);
        }

        done(null, {
            firstName: response.rows[0].firstname,
            lastName: response.rows[0].lastname,
            email: response.rows[0].email,
            role: response.rows[0].role,
            token
        })
    }));
}
