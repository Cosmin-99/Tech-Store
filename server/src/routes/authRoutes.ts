import { Router } from "express";
import { userLogin, userRegister } from "../controllers/authControllers";
import { googleLogin } from "../controllers/googleLoginController";

export const authRouter: Router = Router();

authRouter.post("/register",userRegister);
authRouter.post("/login",userLogin);
authRouter.post("/google-login", googleLogin)