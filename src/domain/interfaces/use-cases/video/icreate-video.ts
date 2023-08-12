import { VideoRegisterDto } from "../../../dto/video/video-register-dto";

export interface ICreateVideoUseCase {
    execute(user: VideoRegisterDto) : Promise<Video>
}