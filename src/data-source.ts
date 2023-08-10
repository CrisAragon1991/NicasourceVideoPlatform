import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entity/User'
import 'dotenv/config'
import { Reaction } from './entity/Reaction'
import { FollowUser } from './entity/FollowUser'
import { Role } from './entity/Role'
import { Video } from './entity/Video'

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_SERVICE,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: false,
    entities: [User, Reaction, FollowUser, Role, Video],
    migrations: [__dirname + "/migrations/*{.ts,.js}"],
    subscribers: []
})
