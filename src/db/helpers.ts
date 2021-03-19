import {
    Connection,
    ConnectionManager
} from 'typeorm'
import { settings } from '../main/config/env';


export const SQLHelper = {
    client: null as unknown as Connection,

    async connect(): Promise<void> {
        const connectionManager = new ConnectionManager();
        const connection = connectionManager.create({ ...settings.db_props })
        this.client =  await connection.connect()
    },

    getRepository(repositoryName: string) {
        const repository = this.client.getRepository(repositoryName)
        return repository
    }
}