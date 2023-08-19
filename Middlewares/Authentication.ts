import { Request, Response, NextFunction } from "express";
import { verify } from "../helpers/Utils";

export const verify_token = async(req: Request, res: Response, next: NextFunction)=> {
    try{
        const auth = req.headers["authorization"];
        if(!auth){
            res.status(406).json("token not found")
            return false
        }
        else{
            let verified = await verify(auth)
            if(!verified){
                return res.status(406).json("Authorization failed");
            }
            else{
                if(verified instanceof Object){
                    next();
                }
            }
        }
    }
    catch(error){
        console.log(error)
    }
}   
