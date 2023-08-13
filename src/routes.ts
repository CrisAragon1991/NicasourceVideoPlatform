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
import { ReactionController } from './presentation/controller/ReactionController'
import { updateOrInsertReactionImplementation } from './domain/use-cases/reaction/update-insert-implementation'
import { ReactionUpdateDto } from './domain/dto/reaction/reaction-dto'
import { createFollowerUseCase } from './domain/use-cases/follow-user/create-follow-implementation'
import { deleteFollowerUseCase } from './domain/use-cases/follow-user/delete-follow-implementation'
import { FollowUserController } from './presentation/controller/FollowUserController'
import { profileUserImplemetation } from './domain/use-cases/user/iprofile-user-implementation'

const userControllerDependencies = [
    createUserImplemetation,
    logginUseCaseImplemetation,
    profileUserImplemetation
]

const videoControllerDependencies = [
    createVideoImplemetation,
    listVideoImplemetation,
    detailsVideoImplemetation,
    updateVideoImplemetation
]

const reactionControllerDependencies = [
    updateOrInsertReactionImplementation   
]

const followControllerDependencies = [
    createFollowerUseCase,
    deleteFollowerUseCase   
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
    },
    {
        method: 'get',
        route: '/user/:followedUserId',
        controller: UserController,
        action: 'userCreatorProfile',
        dependencies: userControllerDependencies,
        middlewares: [verifyToken, roleChecker([`followedUserIdIsTeacher`])]
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

export const reactionRoutes = [
    {
        method: 'post',
        route: '/reaction/:videoId',
        controller: ReactionController,
        action: 'updateOrInsert',
        dependencies: reactionControllerDependencies,
        middlewares: [verifyToken, TypeValidation(ReactionUpdateDto)]
    }
]

export const followRoutes = [
    {
        method: 'post',
        route: '/follow/:followedUserId',
        controller: FollowUserController,
        action: 'follow',
        dependencies: followControllerDependencies,
        middlewares: [verifyToken, roleChecker([`followedUserIdIsTeacher`])]
    },
    {
        method: 'post',
        route: '/unfollow/:followedUserId',
        controller: FollowUserController,
        action: 'unfollow',
        dependencies: followControllerDependencies,
        middlewares: [verifyToken, roleChecker([`followedUserIdIsTeacher`])]
    }
]
export const Routes = [
    ...UserRoutes,
    ...videosRoutes,
    ...reactionRoutes,
    ...followRoutes
]