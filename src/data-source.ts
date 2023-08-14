import 'reflect-metadata'
import { DataSource } from 'typeorm'
import 'dotenv/config'
import { User } from './data/entity/User'
import { Reaction } from './data/entity/Reaction'
import { FollowUser } from './data/entity/FollowUser'
import { Role } from './data/entity/Role'
import { Video } from './data/entity/Video'

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_SERVICE,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: true,
    entities: [User, Reaction, FollowUser, Role, Video],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    subscribers: []
})
