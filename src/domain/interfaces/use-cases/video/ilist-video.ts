import { Video } from "../../../../data/entity/Video";

export interface IListVideoUseCase {
    execute() : Promise<Video[]>
}