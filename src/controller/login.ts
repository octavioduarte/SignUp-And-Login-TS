import {
    CodeErrorsLogin as code_errors_login,
    Controller,
    HttpResponse,
    LoginControllerRequestType,
    MakeLogin,
    ok,
    serverError,
    unauthorized
} from "../types";

export class LoginController implements Controller {
    constructor(
        private readonly login: MakeLogin,
    ) { }

    async handle(request: LoginControllerRequestType): Promise<HttpResponse> {
        const { result } = await this.login.makeLogin(request)
        if (result) {
            switch (result) {
                case code_errors_login.invalid_credentials: 
                    return unauthorized()
                default:
                    return serverError(new Error())
            }
        }
        return new Promise(resolve => resolve(ok(request)))
    }
} 