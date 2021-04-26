import passport from "passport";
import { Strategy } from "passport-local";
import { pool } from "../database/database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export function localStrategy() {
    passport.use(new Strategy({
        usernameField: "email",
        passwordField: "password"
    }, async (email, password, done) => {
        const response = await pool.query("SELECT * FROM Users WHERE email = $1", [email]);
        if (!response) {
           return done(null, false);
        }
        const isValidPassword = await bcrypt.compare(password, response.rows[0].password);

        if (!isValidPassword) {
           return done(null, false);
        }

        const token = jwt.sign({
            firstName: response.rows[0].firstname,
            lastName: response.rows[0].lastname,
            email: response.rows[0].email,
            role: response.rows[0].role,
        },
            process.env.TOKEN_ENCRYPTION as string)


        return done(null, {
            firstName: response.rows[0].firstname,
            lastName: response.rows[0].lastname,
            email: response.rows[0].email,
            role: response.rows[0].role,
            token
        })
    }));
}
