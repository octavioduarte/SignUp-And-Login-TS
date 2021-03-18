import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';

dotenv.config()

export const settings: SettingsType = {
    db_props: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: Number(process.env.DB_PORT),
        type: process.env.DB_TYPE as 'mysql',
        username: process.env.DB_USER,
        entities: process.env.PATH_ENTITIES as unknown as string[]
    }
}

type SettingsType = {
    db_props: ConnectionOptions
}