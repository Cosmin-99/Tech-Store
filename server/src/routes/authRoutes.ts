import { Router } from "express";
import { userLogin, userRegister } from "../controllers/authControllers";

export const authRouter: Router = Router();

authRouter.post("/register",userRegister);
authRouter.post("/login",userLogin);