import { Router } from 'express'

import { createUserSchema, createUserController } from './features/createUser'

const Routes = Router({ mergeParams: true })

Routes.post('/users', createUserSchema, createUserController.handle)

export { Routes }
