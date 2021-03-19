import { AccountRepository } from "../../db/account-repository"
import { DbCreateAccount } from "../../db/usecases/db-create-account"
import { BcryptAdapter } from "../../utils"

export const makeDbAddAccount = () => {
  const salt: number = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountRepository = new AccountRepository()
  return new DbCreateAccount(accountRepository, accountRepository, bcryptAdapter, accountRepository)
}
