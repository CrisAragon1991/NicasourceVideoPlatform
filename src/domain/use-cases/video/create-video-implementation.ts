export class CreateUserImplementation implements ICreateUserUseCase {
    
    userRepository: VideoRepository

    /**
     *
     */
    constructor(userRepository: VideoRepository) {
        this.userRepository = userRepository
    }

    async execute (user: UserRegisterDto): Promise<User> {
         user.password = await bcrypt.hash(user.password, Number(process.env.BCRYP_HASH_SALT))
        const result = this.userRepository.createResource({...user, role: {id: user.isTeacher ? RoleIdEnum.Teacher : RoleIdEnum.Student}} as any)
        return result
    }
}

export const createUserImplemetation = new CreateUserImplementation(new UserRepository(userDataSource));