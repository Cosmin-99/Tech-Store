import { Router } from "express";
import { createOrder, deleteOrder, getOrderById, getOrders, getOrdersByOwnerId } from "../controllers/orders-controllers";
import { adminMiddleWare } from "../middlewares/adminMiddleware";
import { tokenMiddleWare } from "../middlewares/tokenMiddleware";

export const orderRoutes: Router = Router();

orderRoutes.post("/add-order", tokenMiddleWare, createOrder);
orderRoutes.get("/orders", tokenMiddleWare, getOrders);
orderRoutes.get("/order/:id", tokenMiddleWare, getOrderById);
orderRoutes.get("/get-current-orders", tokenMiddleWare, getOrdersByOwnerId);
orderRoutes.delete("/order/:id", adminMiddleWare, deleteOrder);