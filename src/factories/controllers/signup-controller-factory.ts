import { SignUpController } from "../../controller/signup"
import { makeDbAddAccount } from "../db/signup-db-factory"
import { makeSignUpValidation } from "./validation/signup-validation-factory"

export const makeSignUpController = () => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation())
  return controller
}
