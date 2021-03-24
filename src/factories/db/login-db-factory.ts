import { AccountRepository } from "../../db/account-repository"
import { settings } from '../../../src/main/config/env'
import { DbLogin } from "../../db/usecases/db-login"
import { BcryptAdapter, JwtAdapter } from "../../utils"



export const makeDbLogin = () => {
    const salt: number = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const accountRepository = new AccountRepository()
    const tokeenAdapter = new JwtAdapter(settings.secret_token)
    return new DbLogin(accountRepository, bcryptAdapter, tokeenAdapter)
}