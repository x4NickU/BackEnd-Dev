import { Request, Response } from 'express'

const loggerMiddleware = (req: Request, resp: Response, next) => {
    console.log('Logger Request: ', req.method, req.path)
    next()
}

export default loggerMiddleware