import {
    AccountDisabledError,
    badRequest,
    CodeErrorsLogin as code_errors_login,
    Controller,
    HttpResponse,
    LoginControllerRequestType,
    MakeLogin,
    ok,
    serverError,
    unauthorized,
    Validation
} from "../types";
import { UserNotFoundError } from "../types/errors";

export class LoginController implements Controller {
    constructor(
        private readonly login: MakeLogin,
        private readonly validation: Validation

    ) { }

    async handle(request: LoginControllerRequestType): Promise<HttpResponse> {

        try {
            const error = this.validation.validate(request)

            if (error) {
                return badRequest(error)
            }

            const { result, ...userData } = await this.login.makeLogin(request)
            if (result) {
                switch (result) {
                    case code_errors_login.invalid_credentials:
                        return unauthorized()
                    case code_errors_login.user_not_found:
                        return badRequest(new UserNotFoundError())
                    case code_errors_login.account_disabled: 
                        return badRequest(new AccountDisabledError())
                    default:
                        return serverError(new Error())
                }
            }
            return ok(userData)
        } catch (error) {
            return serverError(error)
        }
    }
} 