import { UserLogginDto } from './domain/dto/user/user-loggin-dto'
import { createUserImplemetation } from './domain/use-cases/user/create-user-implementation'
import { UserController } from './presentation/controller/UserController'
import { TypeValidation } from './presentation/middlewares/type-validation-middleware'
import { logginUseCaseImplemetation } from './domain/use-cases/user/logging-user-implementation'
import { UserRegisterDto } from './domain/dto/user/user-register-dto'
import { VideoController } from './presentation/controller/VideoController'
import { createVideoImplemetation } from './domain/use-cases/video/create-video-implementation'
import { VideoRegisterDto } from './domain/dto/video/video-register-dto'
import { verifyToken } from './presentation/middlewares/verify-token'
import { roleChecker } from './presentation/middlewares/role-checker'
import { RoleIdEnum } from './domain/enums/role-enum'
import { listVideoImplemetation } from './domain/use-cases/video/list-video-implementation'
import { detailsVideoImplemetation } from './domain/use-cases/video/details-video-implementation'
import { updateVideoImplemetation } from './domain/use-cases/video/update-video-implementation'
import { VideoUpdateDto } from './domain/dto/video/video-update-dto'

const userControllerDependencies = [
    createUserImplemetation,
    logginUseCaseImplemetation
]

const videoControllerDependencies = [
    createVideoImplemetation,
    listVideoImplemetation,
    detailsVideoImplemetation,
    updateVideoImplemetation
]

export const UserRoutes = [
    {
        method: 'post',
        route: '/sign-up',
        controller: UserController,
        action: 'save',
        dependencies: userControllerDependencies,
        middlewares: [TypeValidation(UserRegisterDto)]
    },
    {
        method: 'post',
        route: '/logging',
        controller: UserController,
        action: 'logging',
        dependencies: userControllerDependencies,
        middlewares: [TypeValidation(UserLogginDto)]
    }
]

export const videosRoutes = [
    {
        method: 'post',
        route: '/video',
        controller: VideoController,
        action: 'save',
        dependencies: videoControllerDependencies,
        middlewares: [verifyToken, roleChecker([RoleIdEnum.Teacher.toString()]), TypeValidation(VideoRegisterDto)]
    },
    {
        method: 'get',
        route: '/video',
        controller: VideoController,
        action: 'listAll',
        dependencies: videoControllerDependencies,
        middlewares: [verifyToken]
    },
    {
        method: 'get',
        route: '/video/:videoId',
        controller: VideoController,
        action: 'detail',
        dependencies: videoControllerDependencies,
        middlewares: [verifyToken]
    },
    {
        method: 'patch',
        route: '/video/:videoId/changeStatus',
        controller: VideoController,
        action: 'changeStatus',
        dependencies: videoControllerDependencies,
        middlewares: [verifyToken, roleChecker(['video_owner'])]
    },
    {
        method: 'patch',
        route: '/video/:videoId',
        controller: VideoController,
        action: 'update',
        dependencies: videoControllerDependencies,
        middlewares: [verifyToken, TypeValidation(VideoUpdateDto) ,roleChecker(['video_owner'])]
    }
]

export const Routes = [
    ...UserRoutes,
    ...videosRoutes
]