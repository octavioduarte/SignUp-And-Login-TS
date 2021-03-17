import { CreateAccount, SignUpControllerRequestType, SignUpControllerResponseType } from "../../src/types"


export class CreateAccountSpy implements CreateAccount {
    params!: SignUpControllerRequestType
    result = 0

    async create(params: SignUpControllerRequestType): Promise<SignUpControllerResponseType> {
        this.params = params
        return {
            ...this.params, 
            result: this.result
        }
    }
}
