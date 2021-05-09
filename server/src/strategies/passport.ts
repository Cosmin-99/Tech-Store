import passport from "passport";
import { facebookStrategy } from "./facebookStartegy";
import { localStrategy } from "./localStrategy";
export function passportConfig() {
    passport.serializeUser((user, done) => {
        done(null, user);
    })

    passport.deserializeUser((user, done) => {
        done(null, user as Express.User);
    })

    localStrategy();
    facebookStrategy();
}