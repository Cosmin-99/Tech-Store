import { Router } from "express";
import multer from "multer";
import { addCategory, getCategories } from "../controllers/appControllers";

export const appRoutes = Router();
const inMeoryStorage = multer.memoryStorage();
const singleFileUpload = multer({ storage: inMeoryStorage })

appRoutes.post("/add-category", singleFileUpload.single('image') ,addCategory)
appRoutes.get("/categories", getCategories)