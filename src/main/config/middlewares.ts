import { Express, json } from 'express'
import { Request, Response, NextFunction } from 'express'

const cors = (_req: Request, res: Response, next: NextFunction): void => {
    res.set('access-control-allow-origin', '*')
    res.set('access-control-allow-headers', '*')
    res.set('access-control-allow-methods', '*')
    next()
}

const contentType = (_req: Request, res: Response, next: NextFunction): void => {
    res.type('json')
    next()
}


export default (app: Express): void => {
    app.use(cors)
    app.use(json())
    app.use(contentType)
}