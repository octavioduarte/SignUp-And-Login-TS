import { LoginControllerRequestType, MakeLogin } from "../types";


export class LoginSpy implements MakeLogin {
    params!: LoginControllerRequestType
    result = 1

    async makeLogin (params: LoginControllerRequestType): Promise<boolean> {
        this.params = params
        return true
    }
}