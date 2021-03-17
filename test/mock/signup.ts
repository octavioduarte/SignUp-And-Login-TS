import { CreateAccount, SignUpControllerRequestType } from "../../src/types/signup"


export class CreateAccountSpy implements CreateAccount {
    params!: SignUpControllerRequestType

    async create(params: SignUpControllerRequestType): Promise<SignUpControllerRequestType> {
        this.params = params
        return this.params
    }
}
