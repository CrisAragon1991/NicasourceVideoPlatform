import { UserLogginDto } from './domain/dto/user/user-loggin-dto'
import { createUserImplemetation } from './domain/use-cases/user/create-user-implementation'
import { UserController } from './presentation/controller/UserController'
import { TypeValidationClass } from './presentation/middlewares/type-validation-middleware'
import { logginUseCaseImplemetation } from './domain/use-cases/user/logging-user-implementation'
import { UserRegisterDto } from './domain/dto/user/user-register-dto'
import { VideoController } from './presentation/controller/VideoController'
import { createVideoImplemetation } from './domain/use-cases/video/create-video-implementation'
import { VideoRegisterDto } from './domain/dto/video/video-register-dto'
import { verifyToken } from './presentation/middlewares/verify-token'
import { roleChecker } from './presentation/middlewares/role-checker'
import { RoleIdEnum } from './domain/enums/role-enum'

const userControllerDependencies = [
    createUserImplemetation,
    logginUseCaseImplemetation
]

const videoControllerDependencies = [
    createVideoImplemetation
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
    }
]

export const videosRoutes = [
    {
        method: 'post',
        route: '/video',
        controller: VideoController,
        action: 'save',
        dependencies: videoControllerDependencies,
        middlewares: [verifyToken, roleChecker([RoleIdEnum.Teacher.toString()]), new TypeValidationClass().ValidationMiddleware(VideoRegisterDto)]
    }
]

export const Routes = [
    ...UserRoutes,
    ...videosRoutes
]