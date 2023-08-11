import { UserLogginDto } from './domain/dto/user-loggin-dto'
import { UserRegisterDto } from './domain/dto/user-register-dto'
import { createUserImplemetation } from './domain/use-cases/create-user-implementation'
import { logginUseCaseImplemetation } from './domain/use-cases/logging-user-implementation'
import { UserController } from './presentation/controller/UserController'
import { TypeValidationClass } from './presentation/middlewares/type-validation-middleware'

const userControllerDependencies = [
    createUserImplemetation,
    logginUseCaseImplemetation
]

export const UserRoutes = [
    {
        method: 'post',
        route: '/sign-up',
        controller: UserController,
        action: 'save',
        dependencies: userControllerDependencies,
        middlewares: [new TypeValidationClass().ValidationMiddleware(UserRegisterDto)]
    },
    {
        method: 'post',
        route: '/logging',
        controller: UserController,
        action: 'logging',
        dependencies: userControllerDependencies,
        middlewares: [new TypeValidationClass().ValidationMiddleware(UserLogginDto)]
    },
]

export const Routes = [
    ...UserRoutes
]