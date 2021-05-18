import { Response, Request, NextFunction } from 'express'
import { pool } from '../database/database'
import { QueryResult } from 'pg';
import azureStorage, { BlobService } from 'azure-storage'
import getStream from 'into-stream'
import { ApiError } from '../error/ApiError';
import { HttpStatusCode } from '../error/HttpStatusCodes';
import { parse } from 'dotenv/types';
import { CurrentUser } from '../models/user.model';

interface MulterRequest extends Request {
    file: any;
}
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as CurrentUser;

        const userInfo: QueryResult = await pool.query(`SELECT CAST(users.id as INTEGER) FROM users WHERE email = $1`, [user.email])
        let queryString = `
            SELECT 
                P.*,
                S.name as subcategoryname
            FROM products as P
            LEFT JOIN subcategories as S ON S.id = P.subcategoryid `
        if (user.role === "provider") {
            queryString += ` WHERE P.owner_id = ${userInfo.rows[0].id}`
        }
        console.log(queryString);
        const subcategories = await pool.query(queryString);
        return res.status(200).json(subcategories.rows)
    } catch (e) {
        next(e);
    }
}
export const addProduct = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const {
            name,
            price,
            discount,
            description
        } = req.body;
        console.log(description);
        const id: number = parseInt(req.params.id);
        const user = req.user as CurrentUser;

        const azureStorageConfig = {
            accountName: process.env.ACCOUNT_NAME as string,
            accountKey: process.env.ACCOUNT_KEY as string,
            blobURL: process.env.BLOB_URL as string,
            containerName: process.env.CONTAINER_NAME as string
        }

        const request = (req as MulterRequest);
        const blobName = request.file.originalname;
        const stream = getStream(request.file.buffer);
        const streamLength = request.file.buffer.length;

        const blobService = azureStorage.createBlobService(azureStorageConfig.accountName, azureStorageConfig.accountKey);

        blobService.createBlockBlobFromStream(azureStorageConfig.containerName, `${blobName}`, stream, streamLength, err => {
            if (err) {
                next(err);
                return
                // return res.status(404).json(err);
            }
            // else {
            //     return res.status(200).json({
            //         filename: blobName,
            //         originalname: request.file.originalname,
            //         size: streamLength,
            //         path: `${azureStorageConfig.containerName}/${blobName}`,
            //         url: `${azureStorageConfig.blobURL}/${blobName}`
            //     });
            // }
        });

        const imageURL = `${azureStorageConfig.blobURL}/${blobName}`

        const userInfo: QueryResult = await pool.query("SELECT * FROM Users WHERE email = $1", [user.email]);

        if (userInfo.rows[0].role === "provider") {
            const response: QueryResult = await pool.query('INSERT INTO Products ("name", "price", "discount", "imageurl", "subcategoryid","description", "owner_id") VALUES ($1, $2, $3, $4, $5,$6,$7)', [name, price, discount, imageURL, id, description, +userInfo.rows[0].id]);
        } else {
            const response: QueryResult = await pool.query('INSERT INTO Products ("name", "price", "discount", "imageurl", "subcategoryid","description") VALUES ($1, $2, $3, $4, $5,$6)', [name, price, discount, imageURL, id, description]);
        }

        return res.status(200).json({
            filename: blobName,
            originalname: request.file.originalname,
            size: streamLength,
            path: `${azureStorageConfig.containerName}/${blobName}`,
            url: `${azureStorageConfig.blobURL}/${blobName}`
        });
    } catch (err) {
        next(err);
    }
}

export const getProductsBySubcategoryId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = parseInt(req.params.id)
        const products: QueryResult = await pool.query(`
            SELECT CAST(products.id as INTEGER),
                    products.name,
                    CAST(products.price as INTEGER),
                    CAST(products.discount as INTEGER),
                    products.imageurl,
                    CAST(products.subcategoryid as INTEGER),
                    products.description
            FROM products 
                INNER JOIN subcategories ON products.subcategoryid = subcategories.id
            WHERE subcategoryid = $1
        `, [id]);
        const subcategory: QueryResult = await pool.query(`
            SELECT CAST(subcategories.id as INTEGER),
                   subcategories.imageurl,
                   subcategories.name, 
                   CAST(subcategories.categoryid as INTEGER) 
                FROM subcategories WHERE id = $1
        `, [id]);
        const category: QueryResult = await pool.query(
            `SELECT categories.name, CAST(categories.id as INTEGER) FROM categories WHERE id = $1`
            , [subcategory.rows[0].categoryid]);
        return res.status(200).json(
            {
                category: {
                    id: category.rows[0].id,
                    name: category.rows[0].name
                },
                subcategory: subcategory.rows[0],
                products: products.rows
            }
        )
    } catch (err) {
        console.log(err)
        next(new ApiError(HttpStatusCode.BadRequest, err));
    }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const azureStorageConfig = {
            accountName: process.env.ACCOUNT_NAME as string,
            accountKey: process.env.ACCOUNT_KEY as string,
            blobURL: process.env.BLOB_URL as string,
            containerName: process.env.CONTAINER_NAME as string
        }

        const { name, price, discount, description } = req.body;
        console.log(description);
        const id: number = parseInt(req.params.id);
        const request = (req as MulterRequest)

        if (request.file !== undefined) {

            const blobName = request.file.originalname;
            const stream = getStream(request.file.buffer);
            const streamLength = request.file.buffer.length;

            const blobService: BlobService = azureStorage.createBlobService(azureStorageConfig.accountName, azureStorageConfig.accountKey);

            blobService.createBlockBlobFromStream(azureStorageConfig.containerName, `${blobName}`, stream, streamLength, err => {
                if (err) {
                    return next(err);
                }
            });

            const imageURL: string = `${azureStorageConfig.blobURL}/${blobName}`
            const response: QueryResult = await pool.query('UPDATE products SET "name" = $1, "price" = $2, "discount" = $3, "imageurl" = $4,"description"= $5 WHERE id = $6',
                [name, price, discount, imageURL, description, id]);

            return res.status(200).json({
                message: "Product updated succesfully !!!"
            })
        } else {
            const response: QueryResult = await pool.query('UPDATE products SET "name" = $1, "price" = $2, "discount" = $3 WHERE id = $4',
                [name, price, discount, id]);

            return res.status(200).json({
                message: "Product updated succesfully !!!"
            })
        }

    } catch (err) {
        console.log(err)
        next(new ApiError(HttpStatusCode.BadRequest, err));
    }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = parseInt(req.params.id)

        const response: QueryResult = await pool.query("DELETE FROM products WHERE id = $1", [id]);

        return res.status(200).json({
            message: "Product deleted !!!"
        })
    } catch (err) {
        next(new ApiError(HttpStatusCode.BadRequest, err));
    }
}

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = parseInt(req.params.id)
        const response: QueryResult = await pool.query(`SELECT 
            CAST(products.id as INTEGER),
            products.name,
            CAST(products.price as INTEGER),
            CAST(products.discount as INTEGER),
            products.imageurl,
            CAST(products.subcategoryid as INTEGER),
            products.description
        FROM products WHERE id = $1`, [id]);

        const subcategories: QueryResult = await pool.query(`
        SELECT 
            CAST(subcategories.id as INTEGER),
            subcategories.name,
            subcategories.imageurl,
            CAST(subcategories.categoryid as INTEGER)
        FROM subcategories WHERE id = $1`, [response.rows[0].subcategoryid])

        return res.status(200).json({
            // product: response.rows[0],
            subcategory: subcategories.rows[0],
            ...response.rows[0]
        });

    } catch (err) {
        next(new ApiError(HttpStatusCode.BadRequest, err));
    }
}

export const getProductsByIdArray = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ids } = req.body;
        if (ids.length === 0) {
            return res.status(200).json([]);
        }
        const listIds = ids;

        const response: QueryResult = await pool.query(`
        SELECT 
        CAST(products.id as INTEGER),
        products.name,
        CAST(products.price as INTEGER),
        CAST(products.discount as INTEGER),
        products.imageurl,
        CAST(products.subcategoryid as INTEGER),
        products.description
    FROM products WHERE id IN (${listIds})
        `)
        return res.status(200).json(response.rows);
    } catch (err) {
        next(err);
    }
}

export const searchProductsByName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { searchString } = req.body;

        const result: QueryResult = await pool.query(`
        SELECT CAST(products.id as INTEGER),
        products.name,
        CAST(products.price as INTEGER),
        CAST(products.discount as INTEGER),
        products.imageurl,
        CAST(products.subcategoryid as INTEGER),
        products.description
    FROM products WHERE name ILIKE '%${searchString}%' LIMIT 8
        `)

        return res.status(200).json(result.rows);
    } catch (err) {
        next(new ApiError(HttpStatusCode.BadRequest, err));
    }
}