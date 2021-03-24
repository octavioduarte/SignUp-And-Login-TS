import fake from 'faker'
import { CreateAccount, SignUpControllerRequestType, ResultCreateUser, GetUserByToken, AccountUserDB } from "../../src/types"


export class CreateAccountSpy implements CreateAccount {
    params!: SignUpControllerRequestType
    result = 0

    async create(params: SignUpControllerRequestType): Promise<ResultCreateUser> {
        this.params = params
        return {
            ...this.params,
            result: this.result
        }
    }
}


export class GetUserByTokenSpy implements GetUserByToken {
    paeams!: string
    async getUserByToken(token_user: string): Promise<AccountUserDB> {
        return {
            authorization: fake.random.word(),
            email: fake.internet.email(),
            id: fake.random.number(),
            name: fake.name.firstName(),
            password: fake.random.word(),
            status: true,
            type: fake.random.number()
        }
    }

}