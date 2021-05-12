import { Response, Request, NextFunction } from 'express'
import { pool } from '../database/database'
import { QueryResult } from 'pg';
import azureStorage, { BlobService } from 'azure-storage'
import getStream from 'into-stream'
import { ApiError } from '../error/ApiError';
import { HttpStatusCode } from '../error/HttpStatusCodes';

interface MulterRequest extends Request {
    file: any;
}
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subcategories = await pool.query(`
        SELECT 
            P.*,
            S.name as subcategoryname
        FROM products as P
        LEFT JOIN subcategories as S ON S.id = P.subcategoryid  `);
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
            discount
        } = req.body;

        const id: number = parseInt(req.params.id);

        const azureStorageConfig = {
            accountName: process.env.ACCOUNT_NAME as string,
            accountKey: process.env.ACCOUNT_KEY as string,
            blobURL: process.env.BLOB_URL as string,
            containerName: process.env.CONTAINER_NAME as string
        }

        const request = (req as MulterRequest);
        console.log(request.file);
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
        const response: QueryResult = await pool.query('INSERT INTO Products ("name", "price", "discount", "imageurl", "subcategoryid") VALUES ($1, $2, $3, $4, $5)', [name, price, discount, imageURL, id]);

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
                    CAST(products.subcategoryid as INTEGER)
            FROM products 
                INNER JOIN subcategories ON products.subcategoryid = subcategories.id
            WHERE subcategoryid = $1
        `, [id]);
        const subcategory: QueryResult = await pool.query(`
            SELECT subcategories.name, 
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
                subcategoryName: subcategory.rows[0].name,
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

        const { name, price, discount } = req.body;
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
            const response: QueryResult = await pool.query('UPDATE products SET "name" = $1, "price" = $2, "discount" = $3, "imageurl" = $4 WHERE id = $5',
                [name, price, discount, imageURL, id]);

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
