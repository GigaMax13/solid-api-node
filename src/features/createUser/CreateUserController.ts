import { Request, Response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle = async ({ body }: Request, response: Response): Promise<Response> => {
    const { email, name, pass } = body

    try {
      await this.createUserUseCase.execute({
        email,
        name,
        pass
      })

      return response.status(201).send()
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}
