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

            const { access_token, user_data, result } = await this.login.makeLogin(request)
            switch (result) {
                case code_errors_login.invalid_credentials:
                    return unauthorized()
                case code_errors_login.user_not_found:
                    return badRequest(new UserNotFoundError())
                case code_errors_login.account_disabled:
                    return badRequest(new AccountDisabledError())
            }
            return ok({ access_token, user_data })
        } catch (error) {
            return serverError(error)
        }
    }
} 