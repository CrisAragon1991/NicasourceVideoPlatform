import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm'
import { Video } from './Video';
import { User } from './User';
import { BaseEntity } from './BaseEntity/BaseEntity';

export enum ReactionType {
    LIKE = 'Like',
    DISLIKE = 'DisLike',
    ISFUNNY = 'Is funny',
    IMANGRY = 'Im Angry',
    ILOVE = 'I love'
}

@Entity()
export class Reaction extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "enum", enum: ReactionType, })
    reactionType: string

    @ManyToOne(() => Video, (video) => video.reaction)
    video: Video

    @ManyToOne(() => User, (user) => user.reaction)
    user: User
}
