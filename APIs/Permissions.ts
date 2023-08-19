import {Request, Response} from 'express';
import { PrismaClient } from '@prisma/client';
import { schema } from '../APISchema/ValidationSchema';
import { Permissions } from '../types';

const prisma = new PrismaClient();

export const CreatePermission = async(req: Request, res: Response) => {
    const reqData: Permissions = {...req.body}
    const validate = schema.PermissionsSchema.validate({
        roleId: reqData.roleId,
        permissionComponentId: reqData.permissionComponentId,
        view: reqData.view,
        add: reqData.add,
        update: reqData.update,
        remove: reqData.remove
    });
    try{
        if(validate.error){
            res.status(406).json(validate.error?.details[0].message);
        }
        else{
            const setPermission = await prisma.permissions.create({
                data: {
                    roleId: reqData.roleId,
                    permissionComponentId: reqData.permissionComponentId,
                    view: reqData.view,
                    add: reqData.add,
                    update: reqData.update,
                    remove: reqData.remove
                }
            });
            res.status(200).json("Permission setted")
        }
    }
    catch(error){
        console.log(error);
    }
}