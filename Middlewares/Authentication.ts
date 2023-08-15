import { Request, Response, NextFunction } from "express";
import { veryfy } from "../helpers/Utils";

export const verify_token = async(req: Request, res: Response, next: NextFunction)=> {
    try{
        const auth = req.headers["authorization"];
        if(!auth){
            res.status(406).json("token not found")
        }
        else{
            let verify = await veryfy(auth)
            if(!verify){
                return res.status(406).json("Authorization failed");
            }
            else{
                if(verify instanceof Object){
                    res.json(verify.user);
                }
                next();
            }
        }
    }
    catch(error){
        console.log(error)
    }
}   
