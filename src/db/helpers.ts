import { ConnectionManager } from 'typeorm'
import { settings } from '../config/env';


export const SQLHelper = {

    async connect(): Promise<void> {
        const connectionManager = new ConnectionManager();
        const connection = connectionManager.create({...settings.db_props})
        await connection.connect()
    }
}