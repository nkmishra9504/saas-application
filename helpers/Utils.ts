import JWT from 'jsonwebtoken';
const secret_key = 'my secret key';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const veryfy = async(payload: string) => {
    try {
        if (payload != '') {
            let token = payload.split(' ')[1];
            if (!token) {
                return false
            }
            else {
                let verified = JWT.verify(token, secret_key)
                if(verified instanceof Object){
                    const user = await prisma.user.findMany({
                        where:{
                            id: verified.id
                        }
                    });
                    return {
                        status: true,
                        user
                    }
                }
            }
        }
    }
    catch (error) {
        return false
    }
}