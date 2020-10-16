import { DBUsersRepository } from '../../repositories/implementations/DBUsersRepository'
import { RouteSchemaValidator } from '../../middlewares/RouteSchemaValidator'
import { MailProvider } from '../../providers/implementations/MailProvider'
import { CreateUserController } from './CreateUserController'
import { CreateUserUseCase } from './CreateUserUseCase'
import { CreateUserSchema } from './CreateUserSchema'

const dbUsersRepository = new DBUsersRepository()
const mailProvider = new MailProvider()

const createUserUseCase = new CreateUserUseCase(dbUsersRepository, mailProvider)

const createUserSchema = RouteSchemaValidator.validate(CreateUserSchema)

const createUserController = new CreateUserController(createUserUseCase)

export { createUserSchema, createUserController }
