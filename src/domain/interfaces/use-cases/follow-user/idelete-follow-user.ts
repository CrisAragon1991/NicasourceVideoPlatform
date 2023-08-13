export interface IDeleteFollowerUseCase {
    execute(userLoggedId:number, userFollowedId: number) : Promise<boolean>
}