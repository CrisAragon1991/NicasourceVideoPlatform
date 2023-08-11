import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { BaseEntity } from './BaseEntity/BaseEntity'
import { User } from './User'

@Entity()
export class Role extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', nullable: false})
    name: string

    @OneToMany(() => User, (user) => user.role)
    user: User
}
