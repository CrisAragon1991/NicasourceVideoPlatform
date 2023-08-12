import { Video } from "../../../../data/entity/Video";
import { VideoUpdateDto } from "../../../dto/video/video-update-dto";

export interface IUpdateVideoUseCase {
    execute(id: number, video: VideoUpdateDto) : Promise<boolean>
}