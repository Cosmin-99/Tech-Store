import { Request, Response, NextFunction, response } from "express";
import { QueryResult } from "pg";
import { pool } from "../database/database";
import { ApiError } from "../error/ApiError";
import { HttpStatusCode } from "../error/HttpStatusCodes";

export const createOrder = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { date_of_placement,
            address,
            subtotal,
            products,
            owner_id,
            card } = req.body;

        const order: QueryResult = await pool.query(`INSERT INTO Orders 
            ("date_of_placement", "address", "subtotal", "products", "owner_id", "card") 
            VALUES ($1, $2, $3, $4, $5, $6)`, [
            date_of_placement,
            address,
            subtotal,
            products,
            owner_id,
            card
        ])

        return response.status(200).json(order)
    } catch (err) {
        next(new ApiError(HttpStatusCode.BadRequest, err))
    }
}

export const getOrders = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const orders: QueryResult = await pool.query(`
        SELECT  orders.date_of_placement, 
            orders.address,
            CAST(orders.subtotal as INTEGER), 
            orders.products, 
            CAST(orders.owner_id as INTEGER), 
            orders.card 
            FROM orders`);

        return response.status(200).json(orders)
    } catch (err) {
        next(new ApiError(HttpStatusCode.BadRequest, err))
    }
}

export const getOrdersByOwnerId = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const id: number = parseInt(req.params.id);

        const orders: QueryResult = await pool.query(`
        SELECT  orders.date_of_placement, 
            orders.address,
            CAST(orders.subtotal as INTEGER), 
            orders.products, 
            CAST(orders.owner_id as INTEGER), 
            orders.card 
            FROM orders WHERE owner_id = $1`,[id]);

        return response.status(200).json(orders)
    } catch (err) {
        next(new ApiError(HttpStatusCode.BadRequest, err))
    }
}

export const deleteOrder = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const id: number = parseInt(req.params.id);

        const order: QueryResult = await pool.query("DELETE FROM Orders WHERE id = $1",[id]);

        return response.status(200).json({
            message: "Order removed"
        })
    } catch (err) {
        next(new ApiError(HttpStatusCode.BadRequest, err))
    }
}