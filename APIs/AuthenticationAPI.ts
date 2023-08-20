import express, { Request, Response } from 'express';
import Joi from 'joi';
import { schema } from '../APISchema/ValidationSchema';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import { verify } from '../helpers/Utils';
import { User } from '../types';

const prisma = new PrismaClient();
const secret_key = 'my secret key';

export const RegisterOrganization = async (req: Request, res: Response) => {
    const reqData = { ...req.body };
    try {
        const validateOrg = schema.organizationSchema.validate({ orgName: reqData.orgName });
        const validate = schema.userSchema.validate({
            firstName: reqData.firstName,
            middleName: reqData.middleName,
            lastName: reqData.lastName,
            email: reqData.email,
            password: reqData.password,
        })
        if (validate.error || validateOrg.error) {
            res.status(406).json(validate?.error?.details[0].message);
            res.status(406).json(validateOrg?.error?.details[0].message);
            return
        }
        else {
            const organization = await prisma.organization.create({
                data: {
                    name: reqData.orgName
                }
            });
            const hashedPassword = await bcrypt.hash(reqData.password, 10);
            const user = await prisma.user.create({
                data: {
                    organizationId: organization.id,
                    firstName: reqData.firstName,
                    lastName: reqData.lastName,
                    email: reqData.email,
                    password: hashedPassword,
                    isAdmin: true
                }
            });
            res.status(200).json({ message: "Organization created", user });
        }

    }
    catch (error) {
        console.log(error)
    }
}

export const LoginUser = async (req: Request, res: Response) => {
    const reqData = { ...req.body }
    const validate = schema.LoginSchema.validate({
        email: reqData.email,
        password: reqData.password
    });
    try {
        if (validate.error) {
            res.status(406).json(validate.error.details[0].message);
            return
        }
        else {
            const checkEmail = await prisma.user.findMany({
                where: {
                    email: reqData.email,
                }
            });
            if (checkEmail.length == 0) {
                res.status(406).json("Email not exist")
            }
            else {
                if (!checkEmail[0].status || checkEmail[0].softDelete) {
                    res.status(403).json("Access denied, please contact to admin")
                }
                else {
                    const matchPassword = await bcrypt.compare(reqData.password, checkEmail[0].password);
                    if (matchPassword) {
                        const token = JWT.sign({
                            id: checkEmail[0].id,
                            isAdmin: checkEmail[0].isAdmin,
                            isSuperAdmin: checkEmail[0].isSuperAdmin,
                            isSubAdmin: checkEmail[0].isSubAdmin
                        }, secret_key, {
                            expiresIn: '10h'
                        });
                        res.setHeader('authorization', token);
                        res.setHeader('Access-Control-Allow-Origin', '*');
                        res.status(200).json("Login success");
                    }
                    else {
                        res.status(406).json("Invalid credentials");
                    }
                }
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}

export const verify_session = async (req: Request, res: Response) => {
    try {
        const auth = req.headers["authorization"];
        if (auth) {
            let verified = await verify(auth)
            if (!verified) {
                return res.status(406).json("Authentication failed")
            }
            else {
                if (verified instanceof Object) {
                    return res.status(200).json(verified.user)
                }
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}

export const CreateUser = async (req: Request, res: Response) => {
    const reqData: User = { ...req.body }
    const validate = schema.userSchema.validate({
        firstName: reqData.firstName,
        lastName: reqData.lastName,
        email: reqData.email,
        password: reqData.password,
    });
    try {
        if (validate.error) {
            res.status(406).json(validate.error.details[0].message);
            return
        }
        else {
            const checkEmail = await prisma.user.findMany({
                where: {
                    email: reqData.email
                }
            });
            if (checkEmail.length != 0) {
                return res.status(406).json("Email already exists");
            }
            else {
                let auth = req.headers["authorization"];
                let user = await verify(auth ? auth : "");
                if (user instanceof Object) {
                    const organizationId = user.user[0].organizationId ? user.user[0].organizationId : 0;
                    const hashPassword = await bcrypt.hash(reqData.password, 10);
                    await prisma.user.create({
                        data: {
                            organizationId,
                            firstName: reqData.firstName,
                            lastName: reqData.lastName,
                            email: reqData.email,
                            password: hashPassword
                        }
                    });
                    return res.status(200).json("user registered");
                }
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}

export const UpdateUser = async (req: Request, res: Response) => {
    const reqData = { ...req.body }
    const auth: string | undefined = req.headers["authorization"];
    if (auth == undefined) {
        res.status(406).json("authorization failed");
    }
    else {
        const user = await verify(auth);
        if (user instanceof Object) {
            await prisma.user.update({
                where: {
                    id: user.user[0].id
                },
                data:{
                    firstName: reqData.firstName,
                    lastName: reqData.lastName,
                    email: reqData.email,
                    phone: reqData.phone ? reqData.phone : null,
                    userInfo: reqData.userInfo
                }
            });
            res.status(200).json("user data updated");
        }
    }
}

export const AllUsers = async(req: Request, res: Response) => {
    const allUsers = await prisma.user.findMany({});
    res.status(200).json(allUsers);
}