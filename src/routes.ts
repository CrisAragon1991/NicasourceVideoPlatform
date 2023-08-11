import { UserRegisterDto } from './domain/dto/user-register-dto'
import { createUserImplemetation } from './domain/use-cases/create-user-implementation'
import { UserController } from './presentation/controller/UserController'
import { typeValidationMiddleware } from './presentation/middlewares/type-validation-middleware'

const userControllerDependencies = [
    createUserImplemetation
]

export const UserRoutes = [
    {
        method: 'post',
        route: '/sign-up',
        controller: UserController,
        action: 'save',
        dependencies: userControllerDependencies,
        middlewares: [typeValidationMiddleware(UserRegisterDto)]
    }
]

export const Routes = [
    ...UserRoutes
]