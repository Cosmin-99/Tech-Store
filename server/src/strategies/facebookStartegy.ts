import passport from "passport";
import { Strategy } from "passport-facebook";
import { pool } from "../database/database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export function facebookStrategy() {
    passport.use(new Strategy({
        clientID: process.env.FACEBOOK_APP_ID as string,
        clientSecret: process.env.FACEBOOK_APP_SECRET as string,
        callbackURL: "http://localhost:5000/facebook/callback"  
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(profile,accessToken,refreshToken);
    }))
}