import passport from "passport";
import { Strategy } from "passport-local";
import { pool } from "../database/database";
import bcrypt from "bcryptjs";

export function localStrategy() {
    passport.use('local', new Strategy(async (email: string, password: string, done) => {
        const response = await pool.query("SELECT * FROM Users WHERE email LIKE $1", [email]);

        if (!response) {
            return done(null, false, {
                message: "Invalid credentials, couldn,t log you in !!!"
            })
        }

        const isValidPassword = await bcrypt.compare(password, response.rows[0].password);

        if (!isValidPassword) {
            return done(null, false, {
                message: "Invalid credentials, couldn't log you in !!!"
            })
        }

        return done(null, {
            email: response.rows[0].email,
            firstName: response.rows[0].firstname,
            lastName: response.rows[0].lastname
        })
    }));
}

// export const loginStrategy = new LocalStrategy.Strategy((email: string, password: string, done) => {

//     const loginAttempt = async () => {
//         const response = await pool.query("SELECT * FROM Users WHERE email LIKE $1", [email]);

//         if (!response) {
//             return done(null, false, {
//                 message: "Invalid credentials, couldn,t log you in !!!"
//             })
//         }

//         const isValidPassword = await bcrypt.compare(password, response.rows[0].password);

//         if (!isValidPassword) {
//             return done(null, false, {
//                 message: "Invalid credentials, couldn't log you in !!!"
//             })
//         }

//         return done(null, {
//             email: response.rows[0].email,
//             firstName: response.rows[0].firstname,
//             lastName: response.rows[0].lastname
//         })
//     }
//     loginAttempt();
// })