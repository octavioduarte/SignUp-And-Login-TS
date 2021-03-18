import {
    forbidden,
    CreateAccount,
    NoPermissionToRegisterNewUser,
    SignUpControllerRequestType,
    CodeErrors as code_errors,
    serverError,
    ok,
    Validation,
    badRequest
} from '../../src/types'

export class SignUpController {
    constructor(
        private readonly createAccount: CreateAccount,
        private readonly validation: Validation
    ) { }

    async handle(request: SignUpControllerRequestType) {
        try {
            const error = this.validation.validate(request)
            if (error) {
                return badRequest(error)
            }
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
