import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import 'dotenv/config';

console.log('db user',process.env.DB_USER)

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.USE_DOCKER_NETWORK_DATABASE === 'true' ? process.env.DB_SERVICE : `localhost:${process.env.DB_PORT}`,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
