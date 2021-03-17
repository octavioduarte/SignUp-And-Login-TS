import {
    forbidden,
    CreateAccount, 
    NoPermissionToRegisterNewUser,
    SignUpControllerRequestType,
    CodeErrors as code_errors
} from '../../src/types'

export class SignUpController {
    constructor(
        private readonly createAccount: CreateAccount 
    ){}

    async handle(request: SignUpControllerRequestType) {
        const result = await this.createAccount.create(request)
        if (result.result === code_errors.no_permission) {
            return forbidden(new NoPermissionToRegisterNewUser())
        }
        return result
    }
}
