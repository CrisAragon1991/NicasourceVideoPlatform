import { Video } from '../../../../data/entity/Video'

export interface IDetailsVideoUseCase {
    execute(id: number, include: string[]) : Promise<Video>
}