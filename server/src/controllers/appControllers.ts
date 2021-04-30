import { Response, Request, NextFunction } from 'express'
import { pool } from '../database/database'
import azureStorage from 'azure-storage'
import getStream from 'into-stream'
import { QueryResult } from 'pg';
interface MulterRequest extends Request {
    file: any;
}

export const addCategory = async (req: Request, res: Response): Promise<Response | void> => {
    const azureStorageConfig = {
        accountName: process.env.ACCOUNT_NAME as string,
        accountKey: process.env.ACCOUNT_KEY as string,
        blobURL: process.env.BLOB_URL as string,
        containerName: process.env.CONTAINER_NAME as string
    }

    const { name } = req.body;
    const request = (req as MulterRequest)
    const blobName = request.file.originalname;
    const stream = getStream(request.file.buffer);
    const streamLength = request.file.buffer.length;

    const blobService = azureStorage.createBlobService(azureStorageConfig.accountName, azureStorageConfig.accountKey);

    blobService.createBlockBlobFromStream(azureStorageConfig.containerName, `${blobName}`, stream, streamLength, err => {
        if (err) {
            return res.status(404).json(err);
        } else {
            return res.status(200).json({
                filename: blobName,
                originalname: request.file.originalname,
                size: streamLength,
                path: `${azureStorageConfig.containerName}/${blobName}`,
                url: `${azureStorageConfig.blobURL}/${blobName}`
            });
        }
    });

    const imageURL = `${azureStorageConfig.blobURL}/${blobName}`
    const response: QueryResult = await pool.query('INSERT INTO Categories ("name", "imageurl") VALUES ($1, $2)', [name, imageURL]);
};


export const getCategories = async (req: Request, res: Response): Promise<Response> => {
    try {
        console.log(req.user);
        const response = await pool.query('SELECT * FROM Categories')

        return res.status(200).json(response.rows)

    } catch (err) {
        return res.status(404).json(err)
    }
}

export const getSubcategoryById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const subcategories: QueryResult = await pool.query(`
        SELECT subcategories.id,
            subcategories.name,
            subcategories.categoryid,
            subcategories.imageurl,
        FROM subcategories WHERE categoryid = $1
        `, [id]);
        const obj = {
            categoryName:"",
            subcategories:[{
                
            }]
        }

        const category = await pool.query(`
        SELECT * FROM categories WHERE id = $1
        `, [id]);

        return res.status(200).json({
            categoryName: category.rows[0].name,
            subcategories: subcategories.rows
        });

    } catch (e) {
        next(e);
    }
}