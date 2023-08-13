export interface ICreateFollowerUseCase {
    execute(userLoggedId:number, userFollowedId: number) : Promise<boolean>
}