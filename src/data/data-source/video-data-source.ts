import { Video } from "../entity/Video";
import { GenericDataSource } from "./generic-data-source/generic-data-source";

export class VideoDataSource extends GenericDataSource<Video> {
    /**
     *
     */
    constructor() {
        super(Video);
    }
}

export const videoDataSource = new VideoDataSource()