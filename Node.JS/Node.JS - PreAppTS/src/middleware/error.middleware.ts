import HttpException from "../coomon/http-exception";
import {Request, Response, NextFunction} from "express";

export const errorHandler = (
    error: HttpException,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const status = error.status || 500;
    const message = error.message || "It's not you, It's us."
    response.status(status).send(message);
}