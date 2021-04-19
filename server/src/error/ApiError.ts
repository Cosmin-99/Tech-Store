import { HttpStatusCode } from "./HttpStatusCodes";

export class ApiError {
    public statusCode;
    public message;
    constructor(statusCode: HttpStatusCode, message: string) {
        this.statusCode = statusCode;
        this.message = message;
    }
}