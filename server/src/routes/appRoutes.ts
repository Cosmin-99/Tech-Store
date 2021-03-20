import { Router } from "express";
import { userLogin, userRegister } from "../controllers/authControllers";

export const router: Router = Router();

router.post("/api/auth/register",userRegister);
router.post("/api/auth/login",userLogin);