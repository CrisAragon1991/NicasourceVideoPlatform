import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { User } from './User'
import { Reaction } from './Reaction'
import { BaseEntity } from './BaseEntity/BaseEntity'

@Entity()
export class Video extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', nullable: false})
    name: string
    
    @Column({type: 'varchar', nullable: true})
    description: string

    @Column({type: 'varchar', nullable: false})
    patch: string

    @Column({type: 'boolean', default: false})
    published: boolean

    @ManyToOne(() => User, (user) => user.videos)
    user: User

    @OneToMany(() => Reaction, (reaction) => reaction.video)
    reaction: Reaction[]
}