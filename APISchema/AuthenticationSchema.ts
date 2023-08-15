import Joi from 'joi';


export const schema = {
    organizationSchema: Joi.object({
        orgName: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
    }),

    userSchema: Joi.object({
        firstName: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        middleName: Joi.string()
            .alphanum()
            .min(3)
            .max(30),
        lastName: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        email: Joi.string()
            .email()
            .max(100)
            .required(),
        password: Joi.string()
            .min(5)
            .required(),
        phone: Joi.string()
            .min(10)
            .max(10)
    }),
    LoginSchema: Joi.object({
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(5)
            .required()
    })
}


