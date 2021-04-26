import { Router } from "express";
import multer, { Multer, StorageEngine } from "multer";
import { addCategory, getCategories, getSubcategoryById } from "../controllers/appControllers";
import { tokenMiddleWare } from "../utils/tokenMiddleware";

export const appRoutes: Router = Router();
const inMeoryStorage: StorageEngine = multer.memoryStorage();
const singleFileUpload: Multer = multer({ storage: inMeoryStorage })

appRoutes.post("/add-category", singleFileUpload.single('image'), addCategory)
appRoutes.get("/categories", getCategories);
appRoutes.get("/sub-categories/:id", getSubcategoryById);