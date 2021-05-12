import { Router } from "express";
import { getCurrentSession, updateUser } from "../controllers/user-controllers";
import { tokenMiddleWare } from "../utils/tokenMiddleware";

export const userRoutes: Router = Router();

userRoutes.post("/update-user", tokenMiddleWare, updateUser);
userRoutes.get("/current-session", tokenMiddleWare, getCurrentSession);