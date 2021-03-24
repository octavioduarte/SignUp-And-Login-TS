import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm'
 

dotenv.config()


const convertStrToArr = (path: string): string[] => {
    const formattedPath = path.replace(/'/g, '"')
    return JSON.parse(formattedPath);
}

export const settings: SettingsTypes = {
    db_props: {
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: Number(process.env.DB_PORT),
        type: process.env.DB_TYPE as 'mysql',
        username: process.env.DB_USER,
        entities: convertStrToArr(process.env.PATH_ENTITIES as string),
        synchronize: process.env.DB_SYNCHRONIZE === 'true'
    },
    http_port: String(process.env.HTTP_PORT),
    secret_token: String(process.env.SECRET_TOKEN)
}

type SettingsTypes = {
    db_props: ConnectionOptions
    http_port: number | string,
    secret_token: string
} 