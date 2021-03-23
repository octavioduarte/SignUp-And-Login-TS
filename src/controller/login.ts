import {
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