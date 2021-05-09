import { Router } from "express";
import multer, { Multer, StorageEngine } from "multer";
import { providerRegister } from "../controllers/addProviders";
import { addCategory, deleteCategory, getCategories, getCategoryById, getSubcategories, getSubcategoryByCategoryId, updateCatergory } from "../controllers/appControllers";
import { sendEmailProviders } from "../controllers/sendEmailController";
import { tokenMiddleWare } from "../utils/tokenMiddleware";

export const appRoutes: Router = Router();
const inMeoryStorage: StorageEngine = multer.memoryStorage();
const singleFileUpload: Multer = multer({ storage: inMeoryStorage })

appRoutes.post("/add-category", singleFileUpload.single('image'), addCategory)
appRoutes.put("/update-category/:id",singleFileUpload.single('image'),updateCatergory);
appRoutes.get("/categories", getCategories);
appRoutes.get("/sub-categories/:id", getSubcategoryByCategoryId);
appRoutes.get("/sub-categories", tokenMiddleWare, getSubcategories);
appRoutes.post("/provider", sendEmailProviders);
appRoutes.post("/add-providers", providerRegister);
appRoutes.get("/category/:id", getCategoryById);
appRoutes.delete("/category/:id", deleteCategory);