import { Controller, HttpResponse, LoginControllerRequestType, MakeLogin, ok } from "../types";

export class LoginController implements Controller {
    constructor(
        private readonly login: MakeLogin,
    ) { }

    async handle(request: LoginControllerRequestType): Promise<HttpResponse> {
        this.login.makeLogin(request)
        return new Promise(resolve => resolve(ok(request)))
    }
} 