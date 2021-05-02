import { NextFunction, Request, Response } from "express";
import { ApiError } from "./ApiError";

export function apiErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    if (typeof (err) === "string") {
        return res.status(500).json({
            message: err,
        })
    }
    if ("toString" in err) {
        return res.status(500).json({
            message: err.toString()
        })
    }
    return res.status(500).json({
        message: "Something just went wrong ... 😟"
    })
}