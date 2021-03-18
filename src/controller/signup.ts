import {
    forbidden,
    CreateAccount,
    NoPermissionToRegisterNewUser,
    SignUpControllerRequestType,
    CodeErrors as code_errors,
    serverError,
    ok,
    Validation
} from '../../src/types'

export class SignUpController {
    constructor(
        private readonly createAccount: CreateAccount,
        private readonly validation: Validation
    ) { }

    async handle(request: SignUpControllerRequestType) {
        try {
            this.validation.validate(request)
            const result = await this.createAccount.create(request)
            if (result.result === code_errors.no_permission) {
                return forbidden(new NoPermissionToRegisterNewUser())
            }
            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }
}
