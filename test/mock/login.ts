import faker from 'faker'
import { LoginControllerRequestType, MakeLogin, MakeLoginResponse } from "../types";


export class LoginSpy implements MakeLogin {
    user!: MakeLoginResponse
    params!: LoginControllerRequestType
    result!: number

    async makeLogin(params: LoginControllerRequestType): Promise<MakeLoginResponse> {
        this.params = params
        this.user = {
            created_by: faker.random.number(),
            email: this.params.email,
            id: faker.random.number(),
            name: faker.random.word(),
            result: this.result,
            type: faker.random.number(),
            status: true,
        }
        return {
            ...this.user,
            result: this.result
        }
    }
}