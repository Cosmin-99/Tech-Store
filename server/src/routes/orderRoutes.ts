import { Router } from "express";
import { createOrder, deleteOrder, getOrders, getOrdersByOwnerId } from "../controllers/orders-controllers";

export const orderRoutes: Router = Router();

orderRoutes.post("/add-order", createOrder);
orderRoutes.get("/orders", getOrders);
orderRoutes.get("/order/:id", getOrdersByOwnerId);
orderRoutes.delete("/order/:id", deleteOrder);