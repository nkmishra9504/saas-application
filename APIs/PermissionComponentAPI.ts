import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { PermissionComponent } from "../types";
import { schema } from "../APISchema/ValidationSchema";

const prisma = new PrismaClient();

export const AddPermissionComponent = async(req: Request, res: Response)=>{
    const reqData: PermissionComponent = {...req.body} 
    const validate = schema.PermissionComponentSchema.validate({
        name: reqData.name
    });

    try{
        if(validate.error) {
            res.status(406).json(validate.error.details[0].message);
        }
        else {
            const response = await prisma.permissionComponent.create({
                data: {
                    name: reqData.name
                }
            });
            res.status(200).json("Permission component created")
        }
    }
    catch(error){
        console.log(error);
    }
}