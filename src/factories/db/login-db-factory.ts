import { AccountRepository } from "../../db/account-repository"
import { DbLogin } from "../../db/usecases/db-login"
import { BcryptAdapter } from "../../utils"


export const makeDbLogin = () => {
    const salt: number = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const accountRepository = new AccountRepository()
    return new DbLogin(accountRepository, bcryptAdapter)
}