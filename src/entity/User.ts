import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm'
import { Video } from './Video';
import { Reaction } from './Reaction';
import { FollowUser } from './FollowUser';
import { BaseEntity } from './BaseEntity/BaseEntity';
import { Role } from './Role';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', nullable: false})
    firstName: string;

    @Column({type: 'varchar', nullable: false})
    lastName: string

    @Column({type: 'decimal', nullable: false})
    age: number

    @Column({type: 'varchar', unique: true, nullable: false})
    email: string   

    @Column({type: 'varchar', unique: true, nullable: false})
    password: string
    
    @Column({type: 'varchar', unique: true, nullable: false})
    photo: string

    @OneToMany(() => Video, (video) => video.user)
    videos: Video[]

    @OneToMany(() => Reaction, (reaction) => reaction.user)
    reaction: Reaction[]

    @OneToMany(() => FollowUser, (followUser) => followUser.followeruser)
    currentUserIsFollowing: FollowUser[]

    @OneToMany(() => FollowUser, (followUser) => followUser.followedUser)
    currentUserIsFollowed: FollowUser[]

    @ManyToOne(() => Role, (role) => role.user)
    role: Role
}
