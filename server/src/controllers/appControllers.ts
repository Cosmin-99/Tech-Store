import { Response, Request, NextFunction } from 'express'
import { pool } from '../database/database'
import azureStorage, { BlobService } from 'azure-storage'
import getStream from 'into-stream'
import { QueryResult } from 'pg';
import { ApiError } from '../error/ApiError';
import { HttpStatusCode } from '../error/HttpStatusCodes';
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
export const getSubcategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subcategories = await pool.query(`
        SELECT
            sb.*,
            cat.name AS categoryName
        FROM subcategories AS sb
        LEFT JOIN categories AS cat ON sb.categoryid = cat.id
       `);
        return res.status(200).json(subcategories.rows)
    } catch (e) {
        next(e);
    }
}

export const getSubcategoryByCategoryId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id;

        //prefer joins over selects as they're much faster in this case
        const subcategories: QueryResult = await pool.query(`
        SELECT subcategories.id,
            subcategories.name,
            subcategories.categoryid,
            subcategories.imageurl
        FROM subcategories
            INNER JOIN categories ON subcategories.categoryid = categories.id
        WHERE categoryid = $1
        `, [id]);

        const category = await pool.query(`
        SELECT categories.name FROM categories WHERE id = $1
        `, [id]);

        return res.status(200).json({
            categoryName: category.rows[0].name,
            subcategories: subcategories.rows
        });
    } catch (e) {
        next(e);
    }
}

export const updateCatergory = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const azureStorageConfig = {
            accountName: process.env.ACCOUNT_NAME as string,
            accountKey: process.env.ACCOUNT_KEY as string,
            blobURL: process.env.BLOB_URL as string,
            containerName: process.env.CONTAINER_NAME as string
        }

        const { name } = req.body;
        const id: number = parseInt(req.params.id);
        const request = (req as MulterRequest)

        if (request.file !== undefined) {

            const blobName = request.file.originalname;
            const stream = getStream(request.file.buffer);
            const streamLength = request.file.buffer.length;

            const blobService: BlobService = azureStorage.createBlobService(azureStorageConfig.accountName, azureStorageConfig.accountKey);

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

            const imageURL: string = `${azureStorageConfig.blobURL}/${blobName}`
            const response: QueryResult = await pool.query('UPDATE Categories SET "name" = $1, "imageurl" = $2 WHERE id = $3',
                [name, imageURL, id]);

            return res.status(200).json({
                message: "Category updated succesfully !!!"
            })
        } else {
            const response: QueryResult = await pool.query('UPDATE Categories SET "name" = $1 WHERE id = $2',
                [name, id]);

            return res.status(200).json({
                message: "Category updated succesfully !!!"
            })
        }

    } catch (err) {
        next(new ApiError(HttpStatusCode.BadRequest, err));
    }
}

export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = parseInt(req.params.id)
        const response: QueryResult = await pool.query("SELECT * FROM Categories WHERE id = $1",[id]);

        return res.status(200).json(response.rows)
    } catch(err) {
        next(new ApiError(HttpStatusCode.BadRequest, err));
    }
}

export const deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const id: number = parseInt(req.params.id)
        const response: QueryResult = await pool.query("DELETE FROM Categories WHERE id = $1",[id]);

        return res.status(200).json({
            message: "Category deleted !!!"
        })
    } catch(err) {
        next(new ApiError(HttpStatusCode.BadRequest, err));
    }
}
