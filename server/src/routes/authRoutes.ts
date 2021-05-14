import { Router } from "express";
import passport from "passport";
import { userLogin, userRegister } from "../controllers/authControllers";
import { tokenVerification } from "../controllers/checkToken";
import { facebookLogin } from "../controllers/facebookLoginController";
import { googleLogin } from "../controllers/googleLoginController";
import { resetPassword } from "../controllers/resetPasswordController";
import { sendEmail } from "../controllers/sendEmailController";
import { adminMiddleWare } from "../middlewares/adminMiddleware";
import { tokenMiddleWare } from "../middlewares/tokenMiddleware";
export const authRouter: Router = Router();

authRouter.post("/register", userRegister);
authRouter.post("/login",userLogin);
authRouter.post("/google-login", googleLogin);
authRouter.post("/facebook-login", passport.authenticate('facebook'));
authRouter.post("/reset-password", sendEmail);
authRouter.post("/reset-password/:urlKey", resetPassword);
authRouter.post("/verify-token", tokenVerification);