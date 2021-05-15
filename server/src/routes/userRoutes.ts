import { Router } from "express";
import { deleteUser, getCurrentSession, getUsers, updateUser } from "../controllers/user-controllers";
import { adminMiddleWare } from "../middlewares/adminMiddleware";
import { tokenMiddleWare } from "../middlewares/tokenMiddleware";

export const userRoutes: Router = Router();

userRoutes.post("/update-user", tokenMiddleWare, updateUser);
userRoutes.get("/current-session", tokenMiddleWare, getCurrentSession);
userRoutes.delete("/remove-user/:id",adminMiddleWare, deleteUser);
userRoutes.get("/all", adminMiddleWare,getUsers);