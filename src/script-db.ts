import { SQLHelper } from "./db/helpers"
import bcrypt from 'bcrypt'
import { TypesAccountID } from "./types"

(() => {
    try {
        SQLHelper.connect().then(async () => {
            const accountRepository = SQLHelper.getRepository('Accounts')
            await accountRepository.save({
                name: 'User System',
                password: await bcrypt.hash('secret_pass', 12),
                type: TypesAccountID.root,
                email: 'user@system.com',
                status: true,
                created_by: TypesAccountID.system
            })
        })
        console.log('Usuário criado com sucesso')
    } catch (error) {
        console.error(`Ocorreu um erro ao criar o usuário`)
    }
})()