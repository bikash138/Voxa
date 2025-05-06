import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = 'bikash'

export default function middleware(req: Request,res: Response, next: NextFunction){

    const token = req.headers["authorization"] || ""

    const decode = jwt.verify(token, JWT_SECRET)
    if(decode){
       //@ts-ignore
        req.userId = decode.userId
        next()
    }else{
        res.status(500).json({
            message: "Unauthorized"
        })
    }
    
}