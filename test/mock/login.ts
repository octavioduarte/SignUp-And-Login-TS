import faker from 'faker'
import { LoginControllerRequestType, MakeLogin, MakeLoginResponse } from "../types";


export class LoginSpy implements MakeLogin {
    user!: MakeLoginResponse
    params!: LoginControllerRequestType
    result!: number

    async makeLogin(params: LoginControllerRequestType): Promise<MakeLoginResponse> {
        this.params = params
        this.user = {
            user_data: {
                authorization: faker.random.word(),
                email: this.params.email,
                id: faker.random.number(),
                name: faker.random.word(),
                type: faker.random.number(),
                status: true,
            },
            result: this.result,
        }
        return {
            ...this.user,
            result: this.result
        }
    }
}