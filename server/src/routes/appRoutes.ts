import { Router } from "express";
import multer, { Multer, StorageEngine } from "multer";
import { providerRegister } from "../controllers/addProviders";
import { addCategory, deleteCategory, getCategories, getCategoryById, updateCatergory } from "../controllers/appControllers";
import { addProduct, deleteProduct, getProductsBySubcategoryId, updateProduct } from "../controllers/product-controllers";
import { sendEmailProviders } from "../controllers/sendEmailController";
import { addSubcategory, deleteSubcategory, getSubcategories, getSubcategoryByCategoryId, updateSubcategory } from "../controllers/subcategories-controllers";
import { tokenMiddleWare } from "../utils/tokenMiddleware";

export const appRoutes: Router = Router();
const inMeoryStorage: StorageEngine = multer.memoryStorage();
const singleFileUpload: Multer = multer({ storage: inMeoryStorage })
const upload = multer()

appRoutes.post("/add-category", singleFileUpload.single('image'), addCategory)
appRoutes.put("/update-category/:id",singleFileUpload.single('image'),updateCatergory);
appRoutes.get("/categories", getCategories);
appRoutes.get("/sub-categories/:id", getSubcategoryByCategoryId);
appRoutes.get("/sub-categories", tokenMiddleWare, getSubcategories);
appRoutes.post("/provider", sendEmailProviders);
appRoutes.post("/add-providers", providerRegister);
appRoutes.get("/category/:id", getCategoryById);
appRoutes.delete("/category/:id", deleteCategory);
appRoutes.post("/add-subcategory/:id", singleFileUpload.single('image'), addSubcategory);
appRoutes.put("/subcategory/:id", singleFileUpload.single('image'), updateSubcategory);
appRoutes.delete("/subcategory/:id", deleteSubcategory);
appRoutes.post("/add-product/:id", singleFileUpload.single('image'), addProduct);
appRoutes.get("/products/:id", getProductsBySubcategoryId);
appRoutes.put("/products/:id", singleFileUpload.single('image'), updateProduct);
appRoutes.delete("/products/:id", deleteProduct);