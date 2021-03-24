import jwt from 'jsonwebtoken'
import { settings } from '../main/config/env';
import { NextFunction, Request, Response } from "express";


export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        res.status(401).json({ error: 'no token provided' })
        return;
    }

    const parts: string[] = authHeader.split(' ')

    if (!(parts.length === 2)) {
        res.status(401).json({ error: 'token error' })
        return;
    }

    const [scheme, token] = parts


    if (!/^Bearer$/i.test(scheme)) {
        res.status(401).json({ error: 'token malformatted' })
        return;
    }

    jwt.verify(token, settings.secret_token, (error) => {
        if (error) {
            res.status(401).json({ error: 'token invalid' })
        }
    })

    next()
}
