import {  makeDbLogin } from "../db/login-db-factory"
import { LoginController } from "../../controller/login"
import { makeLoginValidation } from "./validation/login-validation-factory"

export const makeLoginController = () => {
    const controller = new LoginController(makeDbLogin(), makeLoginValidation())
    return controller
}
