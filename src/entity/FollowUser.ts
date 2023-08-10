import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Video } from './Video';
import { User } from './User';
import { BaseEntity } from './BaseEntity/BaseEntity';

export enum ReactionType {
    LIKE = "Like",
    DISLIKE = "DisLike"
}

@Entity()
export class FollowUser extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.currentUserIsFollowing)
    followeruser: User

    @ManyToOne(() => User, (user) => user.currentUserIsFollowed)
    followedUser: User
}
