import { Request, Response, NextFunction } from "express";
import { QueryResult } from "pg";
import { pool } from "../database/database";
import { ApiError } from "../error/ApiError";
import { HttpStatusCode } from "../error/HttpStatusCodes";
import { CurrentUser } from "../models/user.model";

export const createOrder = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const {
            date_of_placement,
            address,
            subtotal,
            products,
            card
        } = req.body;
        if (!req.user) {
            next(new ApiError(HttpStatusCode.Unauthorized, "Unauthorized"));
            return;
        }
        const user = req.user as CurrentUser;
        const userQuery = await pool.query(`
            SELECT U.id FROM users as U where email = $1 
        `, [user.email])
        if (userQuery.rowCount === 0) {
            next("User not found");
            return;
        }
        const owner_id = userQuery.rows[0].id;
        const order = await pool.query(`INSERT INTO Orders 
            ("date_of_placement", "address", "subtotal", "products", "owner_id", "card") 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`, [
            date_of_placement,
            address,
            subtotal,
            products,
            owner_id,
            card
        ])
        return res.status(200).json(order.rows[0])
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

        return res.status(200).json(orders.rows)
    } catch (err) {
        next(new ApiError(HttpStatusCode.BadRequest, err))
    }
}
export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const order = await pool.query(`
            SELECT * from orders where id = $1
        `, [id])

        return res.status(200).json(order.rows[0]);
    } catch (e) {
        next(e);
    }
}
export const getOrdersByOwnerId = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        // const id: number = parseInt(req.params.id);
        const user = req.user as CurrentUser;
        const userQuery = await pool.query(`
            SELECT U.id FROM users as U where email = $1 
        `, [user.email])
        if (userQuery.rowCount === 0) {
            next("User not found");
            return;
        }
        const id = userQuery.rows[0].id;
        const orders: QueryResult = await pool.query(`
        SELECT  orders.date_of_placement, 
            CAST(orders.id as INTEGER),
            orders.address,
            CAST(orders.subtotal as INTEGER), 
            orders.products, 
            CAST(orders.owner_id as INTEGER), 
            orders.card 
            FROM orders WHERE owner_id = $1`, [id]);

        return res.status(200).json(orders.rows);
    } catch (err) {
        next(new ApiError(HttpStatusCode.BadRequest, err))
    }
}

export const deleteOrder = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const id: number = parseInt(req.params.id);

        const order: QueryResult = await pool.query("DELETE FROM Orders WHERE id = $1", [id]);

        return res.status(200).json({
            message: "Order removed"
        })
    } catch (err) {
        next(new ApiError(HttpStatusCode.BadRequest, err))
    }
}