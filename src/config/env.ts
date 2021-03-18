import * as dotenv from 'dotenv';

dotenv.config()

export const settings = {
    db_props: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
        type: process.env.DB_TYPE,
        user: process.env.USER,
    }
}