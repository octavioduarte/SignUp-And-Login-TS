import { SignUpController } from "../../controller/signup"
import { AccountRepository } from "../../db/account-repository"
import { DbGenericQueries } from "../../db/usecases/db-helper-queries"
import { makeDbAddAccount } from "../db/signup-db-factory"
import { makeSignUpValidation } from "./validation/signup-validation-factory"

export const makeSignUpController = () => {
  const accountRepository = new AccountRepository()
  const dbGenericQueries = new DbGenericQueries(accountRepository)
  const controller = new SignUpController(dbGenericQueries, makeDbAddAccount(), makeSignUpValidation())
  return controller
}
