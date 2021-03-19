import {
    forbidden,
    CreateAccount,
    NoPermissionToRegisterNewUser,
    SignUpControllerRequestType,
    CodeErrors as code_errors,
    serverError,
    ok,
    Validation,
    badRequest,
    AccountUser
} from '../../src/types'

export class SignUpController {
    constructor(
        private readonly createAccount: CreateAccount,
        private readonly validation: Validation
    ) { }

    async handle(request: SignUpControllerRequestType, responsibleAccount: AccountUser) {
        try {
            const error = this.validation.validate(request)
            if (error) {
                return badRequest(error)
            }
            const { result, ...userData } = await this.createAccount.create(request, responsibleAccount)
            if (result === code_errors.no_permission) {
                return forbidden(new NoPermissionToRegisterNewUser())
            }
            return ok(userData)
        } catch (error) {
            return serverError(error)
        }
    }
}
