import { settings } from './src/config/env'

const { db_props } = settings;

export default {
    "type": db_props.type,
    "host": db_props.host,
    "port": db_props.port,
    "username": db_props.user,
    "password": db_props.password,
    "database": db_props.name
}