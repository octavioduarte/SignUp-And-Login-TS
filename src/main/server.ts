import 'reflect-metadata'

import { SQLHelper } from "../db/helpers";
import { settings } from './config/env'



SQLHelper.connect()
    .then(async () => {
        const app = (await import('./config/app')).default
        app.listen(settings.http_port, () => {
            console.info(`Server running`)
        })
    })
    .catch(console.error)