import { Response, Request } from 'express'
import { pool } from '../database/database'
import { QueryResult } from 'pg';

export const addProduct = async (req: Request, res: Response): Promise<Response> => {
    try{
        const {
            name,
            price,
            discount,
            imageURL
        } = req.body;

        const response: QueryResult = await pool.query('INSERT INTO Products ("name", "price", "discount") VALUES ($1, $2, $3)', [name, price, discount]);
    
        return res.status(200).json({
            message:"Added product."
        })
        
    } catch (err){
        return res.status(400).json(err)
    }
}