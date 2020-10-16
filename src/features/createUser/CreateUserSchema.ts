import joi from 'joi'

export const CreateUserSchema = joi.object({
  body: joi.object().keys({
    email: joi.string().email().required(),
    name: joi.string().min(3).max(30).required(),
    pass: joi.string().min(8).max(30).required()
  })
})
