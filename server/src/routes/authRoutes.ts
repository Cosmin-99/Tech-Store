import { Router } from "express";
import passport from "passport";
import { userLogin, userRegister } from "../controllers/authControllers";
import { facebookLogin } from "../controllers/facebookLoginController";
import { googleLogin } from "../controllers/googleLoginController";
import { resetPassword } from "../controllers/resetPasswordController";
import { sendEmail } from "../controllers/sendEmailController";

export const authRouter: Router = Router();

authRouter.post("/register", userRegister);
authRouter.post("/login", passport.authenticate('local'), userLogin);
authRouter.post("/google-login", googleLogin);
authRouter.post("/facebook-login", facebookLogin);
authRouter.post("/reset-password", sendEmail)
authRouter.post("/reset-password/:urlKey", resetPassword)